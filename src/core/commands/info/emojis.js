const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'emojis',
			description: 'Returns all(up to 25) of the server.',
			examples: ['emojis'],
			aliases: [''],
			cooldown: 5,
			toggleCooldown: false,
			ownerOnly: false,
			clientPemissions: [],
			userPermissions: [],
			type: client.types.INFO  
		});
	}
	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */
	async run(message, args) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const emojis = [];
			message.guild.emojis.cache.forEach(e => emojis.push(`${e} **-** \`:${e.name}:\``));

			const embed = new MessageEmbed()
				.setTitle(`Emoji List [${message.guild.emojis.cache.size}]`)
				.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);

			const interval = 25;
			if (emojis.length === 0) {
				message.channel.send({ embeds: [embed.setDescription('No emojis found. 😢' )]});
			}
			else if (emojis.length <= interval) {
				const range = (emojis.length == 1) ? '[1]' : `[1 - ${emojis.length}]`;
				message.channel.send({ embeds: [
					embed
						.setTitle(`Emoji List ${range}`)
						.setDescription(emojis.join('\n'))
						.setThumbnail(message.guild.iconURL({ dynamic: true }))
				]});
			} else {

				const range = (emojis.length == 1) ? '[1]' : `[1 - ${emojis.length}]`;
				message.channel.send({ embeds: [
					embed
						.setTitle(`Emoji List ${range}`)
						.setDescription(emojis.slice(0, 25).join('\n') + '...')
						.setThumbnail(message.guild.iconURL({ dynamic: true }))
				]});
			}
		});
	}
};
