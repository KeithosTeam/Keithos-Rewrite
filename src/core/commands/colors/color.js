const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class color extends Command {
	constructor(client) {
		super(client, {
			name: 'color',
			description: 'Changes the color of your nickname',
			cooldown: 5,
			type: client.types.COLOR,
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
			toggleCooldown: false
		});
	}
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */

	async run (message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {

            const prefix = data.prefix;
            const embed = new MessageEmbed()
                .setTitle('Color Change')
                .setThumbnail(message.member.avatarURL({ dynamic: true }))
                .addField('Member', `${message.member}`, true)
                .setFooter(message.member.displayName,  message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
            const colors = message.guild.roles.cache.filter(c => c.name.startsWith('#'));
            const colorName = args.join('').toLowerCase();
            const oldColor = (message.member.roles.color && message.member.roles.color.name.startsWith('#')) ? 
            message.member.roles.color : '`None`';

            // Clear if no color provided
            if (!colorName) {
                try {
                    await message.member.roles.remove(colors);
                    embed.addField('Color', `${oldColor} ➔ \`None\``, true)
                    return message.channel.send({ embeds: [embed] });
                } catch (err) {
                    this.client.logger.error(err.stack);
                    return this.utils.sendErrorMessage(message, this, 'Please check the role hierarchy', err.message);
                }
            }

            const role = this.utils.getRoleFromMention(message, args[0]) || message.guild.roles.cache.get(args[0]);
            let color;
            if (role && colors.get(role.id)) color = role;
            if (!color) {
            color = colors.find(c => {
                return colorName == c.name.slice(1).toLowerCase().replace(/\s/g, '') || 
                colorName == c.name.toLowerCase().replace(/\s/g, '');
            });
            }
            // Color does not exist
            if (!color)
            return this.utils.sendErrorMessage(message, this, `Please provide a valid color, use ${prefix}colors for a list`);
            // Color exists
            else {
                try {
                    await message.member.roles.remove(colors);
                    await message.member.roles.add(color);
                    embed.addField('Color', `${oldColor} ➔ ${color}`, true).setColor(color.hexColor)
                    message.channel.send({ embeds: [embed] });
                } catch (err) {
                    this.client.logger.error(err.stack);
                    this.utils.sendErrorMessage(message, this, 'Please check the role hierarchy', err.message);
                }
            }
        });

	}
};


