import { MessageEmbed, TextChannel } from 'discord.js';
import { client } from './client';
import Server from '../minehut/server/Server';

export default class Notification {
    
    message: string;
    server: Server;
    type: 'WARN' | 'ERROR' | 'SUCCESS' | 'INFO';

    constructor(message: string, server: Server, type: 'WARN' | 'ERROR' | 'SUCCESS' | 'INFO') {
        this.message = message;
        this.server = server;
        this.type = type;
    }

    async send() {
        const channel: TextChannel = client.channels.resolve(client.botOptions.notificationChannel) as TextChannel;
        if (!channel || channel.type != 'text') throw new Error('(NOTIFICATIONS) Channel resolvable is invalid!');
        const serverData = await this.server.getAllData();
        const embed = new MessageEmbed();
        embed.setTitle('A notification has been sent from the web server!')
        embed.addField('Server', serverData.name)
        embed.addField('Type', this.type)
        embed.addField('Message', this.message)
        embed.setColor(this.determineColor());
        channel.send(embed);
    }

    determineColor() : string {
        let color: string = '';
        if (this.type == 'WARN') {
            color = 'GOLD';
        } else if (this.type == 'ERROR') {
            color = 'RED';
        } else if (this.type == 'SUCCESS') {
            color = 'GREEN';
        } else if (this.type == 'INFO') {
            color = 'GREY';
        }
        return color;
    }

}