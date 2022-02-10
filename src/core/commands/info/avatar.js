const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');

module.exports = class avatar extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			description: 'Displays your avatar or a user\'s avatar if mentioned',
			aliases: ['pfp', 'av'],
			cooldown: 5,
			toggleCooldown: true,
			type: client.types.INFO
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const avatar = new MessageEmbed()
			.setTitle(`${member.displayName}'s avatar`)
			.setColor(this.client.config.embed.color)
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();


		return message.channel.send({ embeds: [avatar] });
	}
};
