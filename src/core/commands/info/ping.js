const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');

module.exports = class ping extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: 'Ping of Keithos',
			aliases: ['pong'],
			cooldown: 5,
			type: client.types.UTILITY,
			toggleCooldown: true
		});
	}

	async run (message) {

		const embed = new MessageEmbed()
			.setTitle('Pong! 🏓')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.addField('Latency', `\`\`\`ini\n[ ${Date.now() - message.createdTimestamp}ms ] \`\`\``)
			.addField('API Latency', `\`\`\`ini\n[ ${this.client.ws.ping}ms ] \`\`\``)
			.setFooter(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true}))
			.setTimestamp();

		return message.channel.send({ embeds: [embed]});
	}
};
