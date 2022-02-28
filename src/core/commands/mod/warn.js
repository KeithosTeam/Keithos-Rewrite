const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const SchemaUsr = require('../../../models/userdata');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			usage: 'warn <user mention/ID> [reason]',
			description: 'Warns a member in your server. Needs KICK_MEMBERS permission. If autokick is enabled',
            examples: ['warn @MCorange'],
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			type: client.types.MOD  
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
		return this.utils.sendErrorMessage(message, this, 'Im sorrry but the warn command is currently disabled');
		const usrData = SchemaUsr.findOne({ _id: message.guild.id })
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if (!member)
				return this.utils.sendErrorMessage(message, this, 'Please mention a user or provide a valid user ID');
			if (member === message.member)
				return this.utils.sendErrorMessage(message, this, 'You cannot ban yourself'); 
			if (member.roles.highest.position >= message.member.roles.highest.position)
				return this.utils.sendErrorMessage(message, this, 'You cannot ban someone with an equal or higher role');
			if (!member.user.bot)
				return this.utils.sendErrorMessage(message, this, 'You cant warn a bot');

			const autoKick = data.warnAutoKick;

			let reason = args.slice(1).join(' ');
			if (!reason) reason = '`None`';
    		if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
			let warns = usrData.warns[member.id]// || { warns: [] }
			if (typeof(warns) == 'string') warns = JSON.parse(warns);
			const warning = {
				mod: message.member.id,
				date: moment().format('MMM DD YYYY'),
				reason: reason
			}
			warns.warns.push(warning);
			data.updateOne({ _id: message.guild.id, warns: warning  })
        })
	}
};


//{"id": []}