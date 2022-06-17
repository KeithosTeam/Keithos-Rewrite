const util = require('minecraft-server-util');

const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class mcserverstatus extends Command {
	constructor(client) {
		super(client, {
			name: 'mcserverstatus',
			description: 'Pings the minecraft server',
			aliases: ['mcping', 'mcservstats'],
			usage: 'mcserverstatus incursion.mcorange.tk 25565',
			type: client.types.MINECRAFT
		});
	}
	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */
	async run(message, args) {

		const msg = await message.channel.send({ content: 'Pinging...' });

		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const res = await util.status(args[0], args[1]);//.then((result) => {return result})
			const embed = new MessageEmbed()
				.setTitle('Minecraft Server Status')
				.setColor(this.client.config.embed.color)
				.addField('IP', `\`${args[0]}\``)
				.addField('Port', `\`${args[1] || 25565}\``)
				.addField('Version', `\`${res.version.name}\``)
				.addField('Max players', `\`${res.players.max}\``)
				.addField('Players online', `\`${res.players.online}\``)
				.addField('MOTD', `\`${res.motd.clean}\``)
				.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();


			return msg.edit({ content: 'Found', embeds: [embed] });
		});
	}
};
