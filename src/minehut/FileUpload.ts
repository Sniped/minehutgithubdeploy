import fetch from 'node-fetch';
import { server } from '../Minehut';
import { config } from '../Config';
import { FileRes } from './server/types/ResTypes';

export default class FileUpload {
    
    files: ReposGetContentsResponseData[];
    
    constructor(files: ReposGetContentsResponseData[]) {
        this.files = files;
    }

    async execute() : Promise<FileRes[]> {
        const fileResponses: FileRes[] = [];
        this.files.forEach(async file => {
            if (!Array.isArray(file)) {
                const text = Buffer.from(file.content!, 'base64').toString();
                const body = { content: text };
                const path = `/plugins/Skript/scripts/${file.name}`
                const res = await server.uploadFile(path, body);
                fileResponses.push({ name: file.name, res: res });
            }
        });
        return fileResponses;
    }

}