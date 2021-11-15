const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const Command = require('../../Command');


module.exports = class Vote extends Command {
	constructor(client) {
		super(client, {
			name: 'vote',
			description: 'Vote for keithos yes',
			aliases: [],
			cooldown: 10,
			toggleCooldown: true,
		});
	}

	async run(message) {

		const embed = new MessageEmbed()
			.setTitle('Vote for Keithos!')
			.setColor(this.client.config.embed.color)
			.addField('Thankyou!', 'We realy apretiate for voting for us!')
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true}))
			.setTimestamp();

		const button1 = new MessageButton()
			.setStyle('LINK')
			.setLabel('Discord Boats')
			.setURL(this.client.config.links.dboats);

		const button2 = new MessageButton()
			.setStyle('LINK')
			.setLabel('DiscorBotList')
			.setURL(this.client.config.links.dbl);

		const row = new MessageActionRow()
			.addComponents(button1, button2);

		return message.channel.send({ embeds: [embed], components: [row]});
	}
};
