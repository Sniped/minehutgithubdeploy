import { Post, Controller, UseBefore, Req, Use } from '@tsed/common';
import { VerifySignature } from '../../middlewares/VerifySignature';
import { Request } from 'express';
import { octokit } from '../../Octokit';
import { server } from '../../Minehut';
import { StatusRes } from '../../minehut/server/types/ResTypes';
import PushPayload from '../../github/PushEvent/PushPayload';
import Repository from '../../github/PushEvent/repository/Repository';
import Commit from '../../github/PushEvent/Commit';
import FileUpload from '../../minehut/FileUpload';
import Notification from '../../discord/Notification';

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
        const initialNotification = new Notification('Received webhook request', 'INFO');
        initialNotification.send();
        const serverStatus: StatusRes = await server.getStatus();
        if (serverStatus.status != 'ONLINE') {
            const offlineServerNotification = new Notification('Server is offline, starting it up... please wait 1 minute.', 'WARN');
            offlineServerNotification.send();
            if (serverStatus.status == 'SERVICE_OFFLINE') {
                await server.startService();
            } else if (serverStatus.status == 'OFFLINE') {
                await server.start();
            }
            await this.sleep();
        }
        commits.forEach(async c => {
            const commit = await octokit.repos.getCommit({ owner: repo.owner.name, repo: repo.name, ref: payload.ref });
            const files: ReposGetContentsResponseData[] = [];
            for (var i = 0; i < commit.data.files.length; i++) {
                const f = commit.data.files[0];
                const fileRes = await octokit.repos.getContents({ owner: repo.owner.name, repo: repo.name, path: f.filename });
                const file: ReposGetContentsResponseData = fileRes.data;
                files.push(file);
            }
            const req = new FileUpload(files);
            const responses = await req.execute();
            const filteredRes = responses.filter(f => f.res);
            if (filteredRes.length > 0) {
                const errorNotification = new Notification('Error while uploading files to Minehut!', 'ERROR');
                errorNotification.send();
            } else {
                const successNotifiation = new Notification('Successfully deployed all files!', 'SUCCESS');
                successNotifiation.send();
            }
        });
    }

    async sleep() : Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, 30000));
    }
}