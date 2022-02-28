const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class bird extends Command {
	constructor(client) {
		super(client, {
			name: 'bird',
			description: 'Gets a random bird picture',
      examples: ['bird'],
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
            this.utils.sendErrorMessage(message, this, 'Please try again in a few seconds', err.message);
          }

	}
};
