const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class cat extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			description: 'gets a cat pic',
      examples: ['cat'],
			aliases: ['meow', 'kitty'],
			type: client.types.FUN 
	    })
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        const apiKey = this.client.config.apiKeys.catApi
        try {
          const res = await fetch('https://api.thecatapi.com/v1/images/search', { headers: { 'x-api-key': apiKey }});
          const img = (await res.json())[0].url;
          const embed = new MessageEmbed()
            .setTitle('🐱  Meow!  🐱')
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
