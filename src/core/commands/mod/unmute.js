const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'addrole',
			description: '',
            example: '',
			aliases: ['', ''],
			cooldown: 5,
			toggleCooldown: false,
            clientPemissions: [],
            userPermissions: [],
			type: client.types.MOD //can be UTILITY, MINECRAFT, FUN, COLOR, INFO, POINTS, MISC, MOD, ADMIN, OWNER,
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
