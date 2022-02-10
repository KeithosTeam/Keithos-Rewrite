const Client = require('../structures/Client');

module.exports = class Event {
	/**
     * The discord.js client
     * @param {Client} client 
     */
	constructor(client, option = {
		name: '',
		once: false
	}) {
        
		this.client = client;
		this.name = option.name || null;
		this.once = option.once || false;
	}

	async run (...args) {
		return;
	}
};
