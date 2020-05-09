import ServerOptions from './ServerOptions';
import fetch from 'node-fetch';
import { config } from '../../Config';
import { StatusRes } from './types/ResTypes';
import { FileUploadReq } from './types/ReqTypes';

export default class Server {
    
    options: ServerOptions;

    constructor(options: ServerOptions) {
        this.options = options;
    }

    async getStatus() : Promise<StatusRes> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/status`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        const body: StatusRes = await res.json();
        return body;
    }

    async startService() : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/start_service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        return res.status == 200;
    }

    async start() : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        return res.status == 200;
    }

    async uploadFile(path: string, content: FileUploadReq) : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/file/${this.options.serverID}/edit/${path}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        return res.status == 200;
    }

}