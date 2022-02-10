const Client = require('../structures/Client');

module.exports = class Command {
	/**
     * @param {Client} client 
     */
	constructor(client, option = {
		type: '',
		name: '',
		description: '',
		aliases: [],
		examples: [],
		usage: '',
		cooldown: 0,
		ownerOnly: false,
		toggleCooldown: false,
		clientPermissions: [],
		userPermissions: []
	}) {

		this.client = client;
		this.type = option.type || 'None';
		this.name = option.name;
		this.description = option.description || '';
		this.aliases = option.aliases || [];
		this.examples = option.examples || [];
		this.usage = option.usage || '';
		this.cooldown = option.cooldown || 5;
		this.emoji = require('../utils/emoji.json');
		this.ownerOnly = option.ownerOnly || false;
		this.toggleCooldown = option.toggleCooldown || false;
		this.clientPermissions = option.clientPermissions || [];
		this.userPermissions = option.userPermissions || [];
		this.utils = require('../utils/utils');
	}

	async run (message, args) {
		return;
	}
};
