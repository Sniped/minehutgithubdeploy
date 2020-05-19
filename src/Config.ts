import fs from 'fs';
import path from 'path';
import ClientOptions from './discord/Client/ClientOptions';
import ServerInterface from './minehut/server/ServerInterface';
import RepoInterface from './github/RepoInterface';

interface ConfigInterface {
    github: {
        repos: RepoInterface[];
        secret: string;
        accessToken: string;
    }
    discord: ClientOptions;
    minehut: {
        base: string;
        servers: ServerInterface[];
    }
}

const checkIfConfigExists = () : boolean => {
    if (!fs.existsSync(path.resolve(__dirname, '../config.json'))) {
        return false;
    } else return true;
}

const config: ConfigInterface = require('../config.json');
export { config, checkIfConfigExists };