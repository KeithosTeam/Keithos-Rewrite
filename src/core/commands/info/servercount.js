const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'servercount',
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
            //code
        })
	}
};
