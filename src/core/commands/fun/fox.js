const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');

module.exports = class duck extends Command {
	constructor(client) {
		super(client, {
            name: 'fox',
            aliases: ['snowboi'],
            usage: 'fox',
            description: 'Finds a random fox for your viewing pleasure.',
            type: client.types.FUN
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            const res = await fetch('https://randomfox.ca/floof/');
            const img = (await res.json()).image;
            const embed = new MessageEmbed()
              .setTitle('🦊  What does the fox say?  🦊')
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
