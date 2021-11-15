const { Message, MessageEmbed } = require('discord.js');
const Schema = require('../../../models/config');
const Command = require('../../Command');

module.exports = class setprefix extends Command {
	constructor(client) {
		super(client, {
			name: 'setprefix',
			description: 'Display the current prefix or change it',
			aliases: ['spref', 'prefix'],
			userPermissions: ['MANAGE_GUILD'],
			example: ['prefix !'],
			cooldown: 10,
			toggleCooldown: false
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {

		let prefix = args[0];

        
		const schema = await Schema.findOne({ _id: message.guild.id });
		const oldPrefix = schema.prefix;
		const prefixEmbed = new MessageEmbed()
			.setTitle('Prefix')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (!prefix) {
			return message.channel.send({
				embeds: [prefixEmbed.setDescription(`The current prefix of this guild is \`${schema.prefix}\`\nTo change use \`${schema.prefix}prefix <new>\``)]
			});
		}

		if (prefix.length > 4) {
			return message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix cannot be more than \`4\` chars!`)] });
		}

		if (schema.prefix === prefix) {
			return message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix is already \`${schema.prefix}\``)] });
		}

		return schema.updateOne({ _id: message.guild.id, prefix: prefix }).then(() => {
			message.channel.send({ embeds: [prefixEmbed.addField('Success!', `${this.emoji.tick} Prefix has been changed from \`${oldPrefix}\` to \`${prefix}\``)] });
		});
	}
};
