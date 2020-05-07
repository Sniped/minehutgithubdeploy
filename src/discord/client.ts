import BotClient from './Client/BotClient';
import { config } from '../Config';
import { $log } from '@tsed/common';

export const client = new BotClient(config.discord);

client.on('ready', () => {
    $log.debug('[DISCORD] Bot is online!');
});

client.login(client.botOptions.token);