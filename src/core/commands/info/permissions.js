const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const permissions = require("../../../utils/permissions.json")

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'permissions',
			description: 'returns the permissions for the user/bot',
            examples: ['permissions @MCorange'],
			aliases: ['perms'],
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
			const member =  this.utils.getMemberFromMention(message, args[0]) || 
			message.guild.members.cache.get(args[0]) || message.member;

			// Get member permissions
			const memberPermissions = member.permissions.toArray();
			const finalPermissions = [];
			for (const permission in permissions) {
			if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
			else finalPermissions.push(`- ${permissions[permission]}`);
			}
			console.log(finalPermissions)
			const embed = new MessageEmbed()
			.setTitle(`${member.displayName}'s Permissions`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(`\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)
			.setFooter({text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
			.setTimestamp()
			.setColor(member.displayHexColor);
			message.channel.send({embeds: [embed]});
        })
	}
};
