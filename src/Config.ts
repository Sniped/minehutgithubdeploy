import fs from 'fs';
import path from 'path';
import ClientOptions from './discord/Client/ClientOptions';

interface ConfigInterface {
    secret: string;
    accessToken: string;
    discord: ClientOptions;
    minehut: {
        base: string;
        token: string;
        serverID: string;
        sessionID: string;
    }
}

const checkIfConfigExists = () : boolean => {
    if (!fs.existsSync(path.resolve(__dirname, '../config.json'))) {
        return false;
    } else return true;
}

const config: ConfigInterface = require('../config.json');
export { config, checkIfConfigExists };