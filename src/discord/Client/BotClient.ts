import { Client } from 'discord.js';
import ClientOptions from './ClientOptions';

export default class BotClient extends Client {
    
    botOptions: ClientOptions;

    constructor(botOptions: ClientOptions) {
        super({ disableMentions: 'everyone' });
        this.botOptions = botOptions;
    }
}