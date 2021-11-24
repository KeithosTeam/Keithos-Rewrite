const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');


module.exports = class credit extends Command {
	constructor(client) {
		super(client, {
			name: 'error',
			description: 'Creates error in console',
			aliases: ['err'],
			cooldown: 8, 
			toggleCooldown: false,
			type: client.types.OWNER
		});
	}

	async run (message, args) {
		this.client.logger.error('test');
		this.utils.sendErrorMessage(message, this, 'testing')
	}
};
