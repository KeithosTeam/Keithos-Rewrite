const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class admins extends Command {
	constructor(client) {
		super(client, {
			name: 'admins',
			usage: 'admins',
			examples: ['admins'],
			description: 'Displays a list of all current admins.',
			type: client.types.INFO,
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'] 
		});
	}
	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */
	async run(message, args) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
		// Get admin role
			const adminRoleId = data.adminRole;
			
			const adminRole = message.guild.roles.cache.get(adminRoleId) || '`None`';
			// console.log(adminRole)
			const admins = message.guild.members.cache.filter(m => {
				if (m.roles.cache.find(r => r === adminRole)) return true;

			}).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1);

			const embed = new MessageEmbed()
				.setTitle(`Admin List [${admins.size}]`)
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.addField('Admin Role', `${adminRole}`)
				.addField('Admin Count', `**${admins.size}** out of **${message.guild.members.cache.size}** members`)
				.setFooter({ text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);

			const interval = 24;

			if (admins.size === 0) {
				message.channel.send({embeds: [embed.setDescription('No admins found.')] });
				console.log("2.1");
			}
			else if (admins.size <= interval) {
				const range = (admins.size == 1) ? '[1]' : `[1 - ${admins.size}]`;

				let str = "";
				admins.forEach((value, key) => {
					str += `<@${value.id}>`;
				});
				
				
				message.channel.send({embeds: [embed
					.setTitle(`Admin List ${range}`)
					.setDescription(`${str}`)
				]});
			} else {
				this.utils.sendErrorMessage(message, this, `Error: ${admins.length} of admins`);
			}

		});
	}
};
