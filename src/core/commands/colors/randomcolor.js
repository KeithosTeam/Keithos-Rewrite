const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class randomcolor extends Command {
	constructor(client) {
		super(client, {
			name: 'randomcolor',
			description: 'asd',
            example: 'colors',
			cooldown: 5,
			toggleCooldown: false,
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
			type: client.types.COLOR 
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