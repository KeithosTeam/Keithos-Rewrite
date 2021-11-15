const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const Command = require('../../Command');

module.exports = class invite extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			description: 'Invite our bot to the server.',
			aliases: ['inv'],
			type: client.types.UTILITY,
			cooldown: 5,
			toggleCooldown: true
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {

		const embed = new MessageEmbed()
			.setTitle('Invite Keithos To Your Server!')
			.setColor(this.client.config.embed.color)
			.addField('Thanks!', 'We hope you like Keithos!')
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true}))
			.setTimestamp();

		const invite = new MessageButton()
			.setStyle('LINK')
			.setURL(this.client.config.links.invite)
			.setLabel('Click Here')
			.setEmoji('❤️');


		const row = new MessageActionRow()
			.addComponents(invite);

		return message.channel.send({ embeds: [embed], components: [row] });
	}
};
