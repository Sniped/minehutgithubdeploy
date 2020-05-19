import ServerInterface from './ServerInterface';
import fetch from 'node-fetch';
import { config } from '../../Config';
import { StatusRes, ServerData, LoginRes } from './types/ResTypes';
import { FileUploadReq } from './types/ReqTypes';
import ServerEventEmitter from './ServerEventEmitter';

export default class Server extends ServerEventEmitter {
    
    options: ServerInterface;
    token?: string;
    sessionID?: string;

    constructor(options: ServerInterface) {
        super(options.changes);
        this.server = this;
        this.options = options;
        this.setCreds();
    }

    async setCreds() {
        const loginRes = await this.login();
        this.token = loginRes.token;
        this.sessionID = loginRes.sessionId;
    }

    async login() : Promise<LoginRes> {
        const res = await fetch(`${config.minehut.base}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.options.creds)
        });
        const body: LoginRes = await res.json();
        return body;
    }

    async getStatus() : Promise<StatusRes> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/status`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token!,
                'x-session-id': this.sessionID!
            }
        });
        const body: StatusRes = await res.json();
        return body;
    }

    async getAllData() : Promise<ServerData> {
        const res = await fetch(`${config.minehut.base}/servers/${this.options.ownerID}/all_data`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token!,
                'x-session-id': this.sessionID!
            }
        });
        const body: ServerData[] = await res.json();
        const serverData = body.filter(s => s._id == this.options.serverID);
        return serverData[0];
    }

    async startService() : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/start_service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token!,
                'x-session-id': this.sessionID!
            }
        });
        return res.status == 200;
    }

    async start() : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/server/${this.options.serverID}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token!,
                'x-session-id': this.sessionID!
            }
        });
        return res.status == 200;
    }

    async uploadFile(path: string, content: FileUploadReq) : Promise<boolean> {
        const res = await fetch(`${config.minehut.base}/file/${this.options.serverID}/edit/${path}`, {
            method: 'POST',
            body: JSON.stringify({ content: content.content }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token!,
                'x-session-id': this.sessionID!
            }
        });
        return res.status == 200;
    }

}