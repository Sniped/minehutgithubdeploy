import Server from './minehut/server/Server';
import { config } from './Config';

export const server = new Server(config.minehut.options);