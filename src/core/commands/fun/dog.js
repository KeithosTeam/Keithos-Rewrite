const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
            name: 'dog',
            aliases: ['puppy', 'pup', 'doggo', 'pupper'],
            usage: 'dog',
            description: 'Finds a random dog for your viewing pleasure.',
            type: client.types.FUN
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const img = (await res.json()).message;
            const embed = new MessageEmbed()
              .setTitle('🐶  Woof!  🐶')
              .setImage(img)
              .setFooter(message.member.displayName,  message.author.avatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(message.guild.me.displayHexColor);
              message.channel.send({ embeds: [embed] });
          } catch (err) {
            this.client.logger.error(err.stack);
            this.utils.sendErrorMessage(message, this, 'Please try again in a few seconds', err.message);
          }
	}
};
