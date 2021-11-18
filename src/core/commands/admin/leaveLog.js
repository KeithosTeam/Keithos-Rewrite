const { Message } = require('discord.js');
const Schema = require('../../../models/config');
const Command = require('../../Command');

module.exports = class joinLog extends Command {
	constructor(client) {
		super(client, {
			name: 'setleavelog',
			description: 'Set the leave log channel',
			type: 'admin',
			aliases: ['sjl'],
			cooldown: 8,
			example: 'setleavelog <#channel>',
			toggleCooldown: false,
			userPermissions: ['MANAGE_GUILD']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run (message, args) {


		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

		if (!channel) {
			return message.channel.send({ content: 'You have to mention a channel.'});
		}

		if (channel.type !== 'GUILD_TEXT') {
			return message.channel.send({ content: 'Guild text channel is only allowed'});
		}

		Schema.findOne({ _id: message.guild.id }, async (e, data) => {

			if (!data) {
				data = new Schema({ _id: message.guild.id, leaveLog: channel.id});
			} else {
				return data.updateOne({ _id: message.guild.id, leaveLog: channel.id });
			}

			data.save();
		});

		message.channel.send({ content: this.emoji.tick + ` ${channel} is set as leave log`});
	}
};
