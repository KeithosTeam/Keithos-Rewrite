const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');

module.exports = class bird extends Command {
	constructor(client) {
		super(client, {
			name: 'bird',
			description: 'Gets a random bird picture',
            example: 'bird',
			aliases: ['birb', 'chirp'],
			type: client.types.FUN 
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            const res = await fetch('http://shibe.online/api/birds');
            const img = (await res.json())[0];
            const embed = new MessageEmbed()
              .setTitle('🐦  Chirp!  🐦')
              .setImage(img)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(message.guild.me.displayHexColor);
              message.channel.send({ embeds: [embed] });
          } catch (err) {
            this.client.logger.error(err.stack);
            this.utils.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
          }

	}
};
