import Server from './minehut/server/Server';
import { config } from './Config';
import ServerManager from './minehut/server/ServerManager';

const serverManager = new ServerManager();
config.minehut.servers.forEach(s => {
    const server = new Server(s);
    serverManager.registerServer(server);
    server.listen(); 
    server.on('change', (name: string, val) => {
        if (name == 'loggedOut' && val) {
            server.setCreds();
        }
    })
});

export { serverManager };