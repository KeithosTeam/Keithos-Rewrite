const { MessageEmbed, Message } = require('discord.js');
const Command = require('../../Command');
const moment = require('moment');

module.exports = class channelinfo extends Command {
	constructor(client) {
		super(client, {
			name: 'channelinfo',
			description: 'Fetches information about the provided channel. If no channel is given then the current channel info will be displayed.',
			aliases: ['channel', 'ci'],
			examples: ['channelinfo #name'],
			type: client.types.INFO
		});
	}
	/**
     * 
     * @param {Message} message 
     * @param {*} args 
     * @returns 
     */
	async run(message, args) {

		let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel;

		if (channel) {
			args.shift();
		} else channel = message.channel;

		const embed = new MessageEmbed()
			.setTitle('Channel Information')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Channel', `${channel}`, true)
			.addField('ID', `\`${channel.id}\``, true)
			.addField('Type', `\`${channel.type}\``, true)
			.addField('Members', `\`${channel.members.count || 0}\``, true)
			.addField('Bots', `\`${channel.members.array().filter(b => b.user.bot).length}\``, true)
			.addField('Created On', `\`${moment(channel.createdAt).format('MMM DD YYYY')}\``, true)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);


		message.channel.send({ embeds: [embed]});
	}
};