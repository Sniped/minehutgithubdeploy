import ServerOptions from './ServerOptions';
import fetch from 'node-fetch';
import { config } from '../../Config';
import { StatusRes, ServerData } from './types/ResTypes';
import { FileUploadReq } from './types/ReqTypes';
import ServerEventEmitter from './ServerEventEmitter';

export default class Server extends ServerEventEmitter {
    
    options: ServerOptions;

    constructor(options: ServerOptions) {
        super(config.minehut.changes);
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

    async getAllData() : Promise<ServerData> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/all_data`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        const body: ServerData[] = await res.json();
        const serverData = body.filter(s => s._id == this.options.serverID);
        return serverData[0];
    }

    async startService(callback : Function) : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/start_service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        callback();
        return res.status == 200;
    }

    async start(callback : Function) : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        callback();
        return res.status == 200;
    }

    async uploadFile(path: string, content: FileUploadReq) : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/file/${this.options.serverID}/edit/${path}`, {
            method: 'POST',
            body: JSON.stringify({ content: content }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.options.token,
                'x-session-id': this.options.sessionID
            }
        });
        return res.status == 200;
    }

}