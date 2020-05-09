import fetch from 'node-fetch';
import { config } from '../Config';
import FileResponse from '../types/FileUpload/FileResponse';

export default class FileUpload {
    
    files: ReposGetContentsResponseData[];
    
    constructor(files: ReposGetContentsResponseData[]) {
        this.files = files;
    }

    async execute() : Promise<FileResponse[]> {
        const fileResponses: FileResponse[] = [];
        this.files.forEach(async file => {
            if (Array.isArray(file)) return;
            console.log(file.content!);
            const text = Buffer.from(file.content!, 'base64').toString();
            const body = { content: text };
            const path = `/plugins/Skript/scripts/${file.name}`
            const res = await fetch(`${config.minehut.base}/file/${config.minehut.serverID}/edit/${path}`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': config.minehut.token,
                    'x-session-id': config.minehut.sessionID
                }
            });
            fileResponses.push({ name: file.name, res: res });
        });
        return fileResponses;
    }

}