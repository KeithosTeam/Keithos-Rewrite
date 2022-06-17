const { Message, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'donate',
			description: 'Returns a link to donate',
			examples: ['donate'],
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
			const embed = new MessageEmbed()
				.setTitle('Donate for keithos development')
				.setColor(this.client.config.embed.color)
				.addField('Hey!', 'We poured our hearts and souls into this project, We as the team behind keithos would greatly apretiate if you donated! Even if its 1$ it still helps!')
				.setThumbnail(this.client.user.displayAvatarURL())
				.setFooter({ text: `${message.member.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
				.setTimestamp();

			const invite = new MessageButton()
				.setStyle('LINK')
				.setURL(this.client.config.links.paypal)
				.setLabel('paypal');


			const row = new MessageActionRow()
				.addComponents(invite);

			return message.channel.send({ embeds: [embed], components: [row] });
		});
	}
};
