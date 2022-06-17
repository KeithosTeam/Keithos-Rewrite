const Event = require('../../Event');
const Schema = require('../../../models/config');
const { Message, Collection } = require('discord.js');
const automod = require('../../automod/automod');

module.exports = class msage extends Event {
	constructor(client) {
		super(client, {
			name: 'messageCreate'
		});
	}
	/**
     * @param {Message} message 
     */

	async run(message) {
		if (!message.guild.me.permissions.has('SEND_MESSAGES')) {
			return;
		}
		if (message.author.bot) {
			return;
		}
		if (
			message.channel.type !== 'GUILD_TEXT' &&
			message.channel.type !== 'GUILD_VOICE' &&
			message.channel.type !== 'GUILD_NEWS' &&
			message.channel.type !== 'GUILD_NEWS_THREAD' &&
			message.channel.type !== 'GUILD_PUBLIC_THREAD' &&
			message.channel.type !== 'GUILD_PRIVATE_THREAD'
		) {
			return;
		}

		const schema = await Schema.findOne({ _id: message.guild.id });
		/**
         * @type {string}
         */
		let prefix = schema.prefix;

		if (message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`) {
			return message.channel.send({ embeds: [
				{
					title: this.client.user.username,
					description: `My prefix for this server is \`${prefix}\``,
					color: this.client.config.embed.color,
					thumbnail: { url: this.client.user.displayAvatarURL()},
					fields: [{
						name: '** **',
						value: '[Support](https://discord.gg/M7nDZxKk24) | [Github](https://github.com/MCorange99/keithos) | [Website](http://keithos.tk/)'
					}]
				}
			]});
		}

		automod.main(message, Schema);

		const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);
		if (!prefixRegex.test(message.content)) {

			return;
		}
		const [, match] = message.content.match(prefixRegex);
		const args = message.content.slice(match.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();

		
		//const args = message.content.slice(match.length).trim().split(/ +/g);
		//const cmd = args.shift().toLowerCase();

		let command = this.client.commands.get(cmd);

		if (!command) command = this.client.aliases.get(cmd);

		if (command) {

			if (command.ownerOnly === true) {

				if (!this.client.config.owners.includes(message.author.id)) {
					return;
				}

			}

			if (command.toggleCooldown) {

				if (!this.client.cooldowns.has(command.name)) {
					this.client.cooldowns.set(command.name, new Collection());
				}

				const time = this.client.cooldowns.get(command.name);
				const amount = (command.cooldown || 5) * 1000;

				if (time.has(message.author.id)) {

					const expire = time.get(message.author.id) + amount;

					if (Date.now() < expire) {
						const left = (expire - Date.now()) / 1000;

						return message.channel.send({ content: `The command is on cooldown for \`${left.toFixed(1)}\` seconds`});
                        
					}
				}

				time.set(message.author.id, Date.now());
				setTimeout(() => time.delete(message.author.id), amount);

			}

			if (command.userPermissions.length) {

				const array = [];

				try {

					for (const i of command.userPermissions) {
                    
						if (!message.member.permissions.has(i)) {
							array.push(i);
						}
					}

				} catch (err) { return; }

				if (array.length) {
					return message.channel.send({ content: `You don't have permissions:- ${array.join(' , ')}`});
				}
			}

			if (command.clientPermissions.length) {

				const array = [];

				try {

					for (const i of command.clientPermissions) {
                    
						if (!message.guild.me.permissions.has(i)) {
							array.push(i);
						}
					}

				} catch (err) { return; }

				if (array.length) {
					return message.channel.send({ content: `I don't have permissions:- ${array.join(' , ')}`});
				}
			}

			command.run(message, args);
		}
	}
};
