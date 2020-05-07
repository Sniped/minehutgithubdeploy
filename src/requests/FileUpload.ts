import fetch from 'node-fetch';
import File from '../types/FileUpload/File';
import { config } from '../Config';
import FileResponse from '../types/FileUpload/FileResponse';

export default class FileUpload {
    
    files: File[];
    
    constructor(files: File[]) {
        this.files = files;
    }

    async execute() : Promise<FileResponse[]> {
        const fileResponses: FileResponse[] = [];
        this.files.forEach(async file => {
            const text = await this.fetchRawText(file.url);
            const body = { content: text };
            console.log(body);
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

    async fetchRawText(url: string) : Promise<string> {
        const res = await fetch(url);
        return await res.text();
    }

}