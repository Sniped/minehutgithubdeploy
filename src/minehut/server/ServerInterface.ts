import { ServerEvent } from "./types/EventTypes";

export default interface ServerInterface {
    serverID: string;
    changes: ServerEvent[];
    ownerID: string;
    creds: {
        email: string;
        password: string;
    }
}