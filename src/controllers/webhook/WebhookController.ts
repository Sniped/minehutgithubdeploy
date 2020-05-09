import { Post, Controller, UseBefore, Req, Use } from '@tsed/common';
import { VerifySignature } from '../../middlewares/VerifySignature';
import { Request } from 'express';
import { octokit } from '../../Octokit';
import PushPayload from '../../types/PushEvent/PushPayload';
import Repository from '../../types/PushEvent/repository/Repository';
import Commit from '../../types/PushEvent/Commit';
import FileUpload from '../../requests/FileUpload';
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
        commits.forEach(async c => {
            const commit = await octokit.repos.getCommit({ owner: repo.owner.name, repo: repo.name, ref: payload.ref });
            const files: Promise<ReposGetContentsResponseData[]> = new Promise((resolve, reject) => commit.data.files.map(async f => { 
                const fileRes = await octokit.repos.getContents({ owner: repo.owner.name, repo: repo.name, path: f.filename });
                const file: ReposGetContentsResponseData = fileRes.data;
                return file;
            }));
            console.log(await files);
            const req = new FileUpload(await files);
            const responses = await req.execute();
            const filteredRes = responses.filter(f => f.res.status !== 200);
            if (filteredRes.length > 0) {
                const errorNotification = new Notification('Error while uploading files to Minehut!', 'ERROR');
                errorNotification.send();
            } else {
                const successNotifiation = new Notification('Successfully deployed all files!', 'SUCCESS');
                successNotifiation.send();
            }
        });
    }
}