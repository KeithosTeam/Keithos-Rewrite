const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const { oneLine } = require('common-tags');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'softban',
			usage: 'softban <user mention/ID> [reason]',
			description: oneLine`
				Softbans a member from your server (bans then immediately unbans).
				This wipes all messages from that member from your server.      
			`,
			type: client.types.MOD,
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			examples: ['softban @MCorange']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			return this.utils.sendErrorMessage(message, this, 'Im sorrry but the softban command is currently disabled');
        })
	}
};
