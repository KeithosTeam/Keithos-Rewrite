const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'warnpurge',
      aliases: ['purgewarn'],
      usage: 'warnpurge <user mention/ID> <message count> [reason]',
      description: 'Warns a member in your server and then purges their messages from the message count provided.',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS', 'MANAGE_MESSAGES'],
      userPermissions: ['KICK_MEMBERS', 'MANAGE_MESSAGES'],
      examples: ['warnpurge @MCorange 50']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
            return this.utils.sendErrorMessage(message, this, 'Im sorrry but the warnpurge command is currently disabled');
        })
	}
};
