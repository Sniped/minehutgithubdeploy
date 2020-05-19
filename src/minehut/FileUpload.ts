import { FileRes } from './server/types/ResTypes';
import Server from './server/Server';

export default class FileUpload {
    
    files: ReposGetContentsResponseData[];
    server: Server;
    
    constructor(files: ReposGetContentsResponseData[], server: Server) {
        this.files = files;
        this.server = server;
    }

    async execute() : Promise<FileRes[]> {
        const fileResponses: FileRes[] = [];
        this.files.forEach(async file => {
            if (!Array.isArray(file)) {
                const text = Buffer.from(file.content!, 'base64').toString();
                const body = { content: text };
                const path = `/plugins/Skript/scripts/${file.name}`
                const res = await this.server.uploadFile(path, body);
                fileResponses.push({ name: file.name, res: res });
            }
        });
        return fileResponses;
    }

}