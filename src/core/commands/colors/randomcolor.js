const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class randomcolor extends Command {
	constructor(client) {
		super(client, {
			name: 'randomcolor',
			description: 'asd',
            examples: ['colors'],
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
            const embed = new MessageEmbed()
		      .setTitle('Color Change')
		      .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
		      .addField('Member', `${message.member}`, true)
		      .setFooter(message.member.displayName,  message.author.avatarURL({ dynamic: true }))
		      .setTimestamp();
		    const colors = message.guild.roles.cache.filter(c => c.name.startsWith('#'));
		    if (colors.length === 0)
		      return this.utils.sendErrorMessage(message, this, 'There are currently no colors set on this server');
		  	//idfk even have fun lmfao :KEKW:
		  	//probbably the worst code ever lol
		  	let arr = ""
		  	let toggle
		  	colors.forEach((value, key) => {
		  		if (!toggle) {
		  			arr = arr + `${key.toString()}`
		  			toggle = true
		  		} else if (toggle) {
		  			arr = arr + `@${key.toString()}`
		  		}
	        });
	        arr = arr.split('@')
	        // its not getting better lmfaoo
	        const color = colors.get(arr[Math.floor(Math.random() * arr.length)])

		    const oldColor = (message.member.roles.color && message.member.roles.color.name.startsWith('#')) ? 
		      message.member.roles.color : '`None`';

		    try {
		      await message.member.roles.remove(colors);
		      await message.member.roles.add(color);
		      message.channel.send({embeds: [embed.addField('Color', `${oldColor} ➔ ${color}`, true).setColor(color.hexColor)]});
		    } catch (err) {
		      this.client.logger.error(err.stack);
		      this.utils.sendErrorMessage(message, this, 'Please check the role hierarchy', err.message);
		    }
        })
	}
};
