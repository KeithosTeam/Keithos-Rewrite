const { Message, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'github',
			description: '',
			examples: [''],
			aliases: ['', ''],
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
				.setTitle('GitHub repository for keithos')
				.setColor(this.client.config.embed.color)
				.addField('Hey!', 'We poured our hearts and souls into this project, if you dont mind, could you star the repository or even better, contribute!')
				.setThumbnail(this.client.user.displayAvatarURL())
				.setFooter({ text: `${message.member.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
				.setTimestamp();

			const invite = new MessageButton()
				.setStyle('LINK')
				.setURL(this.client.config.links.github)
				.setLabel('GitHub repository for Keithos');


			const row = new MessageActionRow()
				.addComponents(invite);

			return message.channel.send({ embeds: [embed], components: [row] });
		});
	}
};
