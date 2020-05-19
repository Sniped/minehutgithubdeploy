import { Collection } from "discord.js";
import Server from "./Server";

export default class ServerManager {

    serverStore: Collection<string, Server>;

    constructor() {
        this.serverStore = new Collection();
    }

    registerServer(server: Server) {
        const s = this.serverStore.get(server.options.serverID);
        if (s) throw new Error('Server already registered!');
        this.serverStore.set(server.options.serverID, server);
    }

}