const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');


module.exports = class version extends Command {
	constructor(client) {
		super(client, {
			name: 'version',
			description: 'Display current version of Keithos',
			aliases: ['ver', 'v'],
			cooldown: 5,
			type: client.types.INFO,
			toggleCooldown: true
		});
	} 

	async run (message, args) {

		const embed = new MessageEmbed()
			.setTitle(`${this.client.user.username}`)
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.addField('Version', `\`${this.client.pkg.version}\``)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true}));

		return message.channel.send({ embeds: [embed]});
	}
};
