const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class ip extends Command {
	constructor(client) {
		super(client, {
			name: 'ip',
			description: 'Displays the minecraft (or other games) server ip.',
			type: client.types.MINECRAFT
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {

		Schema.findOne({ _id: message.guild.id }, async (e, data) => {

		const avatar = new MessageEmbed()
			.setTitle('Servers IP')
			.setColor(this.client.config.embed.color)
            .addField('IP', `\`${data.ip}\``, true)
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();


		return message.channel.send({ embeds: [avatar] });
		})
	}
};
