import { Post, Controller, UseBefore, Req } from '@tsed/common';
import { VerifySignature } from '../../middlewares/VerifySignature';
import { Request } from 'express';
import { octokit } from '../../Octokit';
import { serverManager } from '../../Minehut';
import { ServerData } from '../../minehut/server/types/ResTypes';
import PushPayload from '../../github/PushEvent/PushPayload';
import Repository from '../../github/PushEvent/repository/Repository';
import Commit from '../../github/PushEvent/Commit';
import FileUpload from '../../minehut/FileUpload';
import Notification from '../../discord/Notification';
import { config } from '../../Config';

@Controller('/webhook')
@UseBefore(VerifySignature)
export class WebhookController {
    @Post()
    async res(@Req() req: Request) {
        const eventName = req.get('X-GitHub-Event');
        if (eventName == 'ping') return {};
        const payload: PushPayload = req.body;
        const repo: Repository = payload.repository;
        const commits: Commit[] = payload.commits;
        const repoServerData = config.github.repos.find(r => r.name === repo.full_name);
        if (!repoServerData) return;
        const server = serverManager.serverStore.get(repoServerData.server);
        if (!server) return;
        const serverData: ServerData = await server.getAllData();
        const upload: Function = async () => {
            commits.forEach(async c => {
                const commit = await octokit.repos.getCommit({ owner: repo.owner.name, repo: repo.name, ref: payload.ref });
                const files: ReposGetContentsResponseData[] = [];
                for (var i = 0; i < commit.data.files.length; i++) {
                    const f = commit.data.files[0];
                    const fileRes = await octokit.repos.getContents({ owner: repo.owner.name, repo: repo.name, path: f.filename });
                    const file: ReposGetContentsResponseData = fileRes.data;
                    files.push(file);
                }
                const req = new FileUpload(files, server);
                const responses = await req.execute();
                const filteredRes = responses.filter(f => f.res);
                if (filteredRes.length > 0) {
                    const errorNotification = new Notification('Error while uploading files to Minehut!', server, 'ERROR');
                    errorNotification.send();
                } else {
                    const successNotifiation = new Notification('Successfully deployed all files!', server, 'SUCCESS');
                    successNotifiation.send();
                }
            });
        }
        if (serverData.status != 'ONLINE') {
            const offlineServerNotification = new Notification('Server is offline, starting it up... please wait 1 minute.', server, 'WARN');
            offlineServerNotification.send();
            if (serverData.status == 'SERVICE_OFFLINE') {
                await server.startService();
            } else if (serverData.status == 'OFFLINE') {
                await server.start();
            }
            server.on('change', async (name: string, val) => {
                // console.log(`${name} -- ${val}`);
                if (name == 'statusChange' && val == 'ONLINE') {
                    await upload();
                }
            });
        } else await upload();
    }
}