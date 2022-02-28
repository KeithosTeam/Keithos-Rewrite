const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'warns',
			aliases: ['warnings'],
			usage: 'warns <user mention/ID>',
			description: 'Displays a member\'s current warnings. A max of 5 warnings can be displayed at one time.',
			userPermissions: ['KICK_MEMBERS'],
			examples: ['warns @MCorange'],
			type: client.types.MOD
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
            //code
        })
	}
};
