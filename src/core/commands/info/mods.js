const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'mods',
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
            const modRoleId = data.modRole;
			
			const modRole = message.guild.roles.cache.get(modRoleId) || '`None`';
			// console.log(adminRole)
			const mods = message.guild.members.cache.filter(m => {
				if (m.roles.cache.find(r => r === modRole)) return true;

			}).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1);

			const embed = new MessageEmbed()
				.setTitle(`Mod List [${mods.size}]`)
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.addField('Mod Role', `${modRole}`)
				.addField('Mod Count', `**${mods.size}** out of **${message.guild.members.cache.size}** members`)
				.setFooter({text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);

			const interval = 24;

			if (mods.size === 0) {
				message.channel.send({embeds: [embed.setDescription('No mods found.')] });
			}
			else if (mods.size <= interval) {
				const range = (mods.size == 1) ? '[1]' : `[1 - ${mods.size}]`;

				let str = "";
				mods.forEach((value, key) => {
					str += `<@${value.id}>`;
				});
				
				
				message.channel.send({embeds: [embed
					.setTitle(`Mod List ${range}`)
					.setDescription(`${str}`)
				]});
			} else {
				this.utils.sendErrorMessage(message, this, `Error: ${admins.length} of admins`);
			}

        })
	}
};
