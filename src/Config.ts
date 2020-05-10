import fs from 'fs';
import path from 'path';
import ClientOptions from './discord/Client/ClientOptions';
import ServerOptions from './minehut/server/ServerOptions';
import { ServerEvent } from './minehut/server/types/EventTypes';

interface ConfigInterface {
    github: {
        secret: string;
        accessToken: string;
    }
    discord: ClientOptions;
    minehut: {
        base: string;
        ownerID: string;
        changes: ServerEvent[];
        options: ServerOptions;
    }
}

const checkIfConfigExists = () : boolean => {
    if (!fs.existsSync(path.resolve(__dirname, '../config.json'))) {
        return false;
    } else return true;
}

const config: ConfigInterface = require('../config.json');
export { config, checkIfConfigExists };