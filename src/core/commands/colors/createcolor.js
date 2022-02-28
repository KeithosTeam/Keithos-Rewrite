const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const rgx = /^#?[0-9A-F]{6}$/i;

module.exports = class createcolor extends Command {
	constructor(client) {
		super(client, {
			name: 'createcolor',
			description: 'asd',
            examples: ['createcolor #FF0000 Red'],
			cooldown: 5,
			toggleCooldown: false,
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
			userPermissions: ['MANAGE_ROLES'],
			type: client.types.COLOR 
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			let hex = args.shift();
			if (!rgx.test(hex)) return this.utils.sendErrorMessage(message, this, 'Please provide a valid color hex and color name');
			if (args.length === 0) return this.utils.sendErrorMessage(message, this, 'Please provide a color name');
			let colorName = args.join(' ');
			if (!colorName.startsWith('#')) colorName = '#' + colorName;
			if (!hex.startsWith('#')) hex = '#' + hex;
			try {
			  const role = await message.guild.roles.create({
				  name: colorName,
				  color: hex,
				  permissions: []
			  });
			  const embed = new MessageEmbed()
				.setTitle('Create Color')
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.setDescription(`Successfully created the ${role} color.`)
				.addField('Hex', `\`${hex}\``, true)
				.addField('Color Name', `\`${colorName.slice(1, colorName.length)}\``, true)
				.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp()
				.setColor(hex);
			  message.channel.send({ embeds: [embed] });
			} catch (err) {
			  this.client.logger.error(err.stack);
			  this.utils.sendErrorMessage(message, this, 'Please try again in a few seconds', err.message);
			}
        })
	}
};
