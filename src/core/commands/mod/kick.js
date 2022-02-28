const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
      usage: 'kick <user mention/ID> [reason]',
      description: 'Kicks a member from your server.',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      examples: ['kick @MCorange']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if (!member)
			  return this.utils.sendErrorMessage(message, this, 'Please mention a user or provide a valid user ID');
			if (member === message.member)
			  return this.utils.sendErrorMessage(message, this, 'You cannot kick yourself'); 
			if (member.roles.highest.position >= message.member.roles.highest.position)
			  return this.utils.sendErrorMessage(message, this, 'You cannot kick someone with an equal or higher role');
			if (!member.kickable)
			  return this.utils.sendErrorMessage(message, this, 'Provided member is not kickable');
        
			let reason = args.slice(1).join(' ');
			if (!reason) reason = '`None`';
			if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

			await member.kick(reason);

			const embed = new MessageEmbed()
				.setTitle('Kick Member')
				.setDescription(`${member} was successfully kicked.`)
				.addField('Moderator', message.member, true)
				.addField('Member', member, true)
				.addField('Reason', reason)
				.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);
			message.channel.send({ embeds: [embed] });
		})
	}
};
