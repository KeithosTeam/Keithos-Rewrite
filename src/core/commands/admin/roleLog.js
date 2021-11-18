const { Message } = require('discord.js');
const Schema = require('../../../models/config');
const Command = require('../../Command');

module.exports = class joinLog extends Command {
	constructor(client) {
		super(client, {
			name: 'setrolelog',
			description: 'Set the nick log channel',
			type: 'admin',
			aliases: ['srl'],
			cooldown: 8,
			example: 'setrolelog <#channel>',
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
				data = new Schema({ _id: message.guild.id, roleLog: channel.id});
			} else {
				return data.updateOne({ _id: message.guild.id, roleLog: channel.id });
			}

			data.save();
		});

		message.channel.send({ content: this.emoji.tick + ` ${channel} is set as role log`});
	}
};
