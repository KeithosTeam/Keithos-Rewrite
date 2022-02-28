const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'addrole',
			description: '',
            examples: [''],
			aliases: ['', ''],
			cooldown: 5,
			toggleCooldown: false,
            clientPemissions: [],
            userPermissions: [],
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
