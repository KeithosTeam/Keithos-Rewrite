const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'findid',
			description: ' returns the id of the given user/channel/role',
			examples: ['findid @MCorange'],
			aliases: ['fid'],
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
			const target = this.utils.getMemberFromMention(message, args[0]) || 
			this.utils.getRoleFromMention(message, args[0]) || 
			this.utils.getChannelFromMention(message, args[0]);
			if (!target) 
				return this.utils.sendErrorMessage(message, this, 'Please mention a user, a role or a channel');//this.sendErrorMessage(message, 0, 'Please mention a user, role, or text channel');
			const id = target.id;
			const embed = new MessageEmbed()
				.setTitle('Find ID')
				.addField('Target', `${target}`, true)
				.addField('ID', `\`${id}\``, true)
				.setFooter({ text: message.member.displayName,  iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);
			message.channel.send({embeds: [embed]});
		});
	}
};
