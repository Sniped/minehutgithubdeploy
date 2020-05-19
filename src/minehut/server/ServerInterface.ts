import { ServerEvent } from "./types/EventTypes";

export default interface ServerInterface {
    serverID: string;
    changes: ServerEvent[];
    ownerID: string;
    creds: {
        username: string;
        password: string;
    }
}