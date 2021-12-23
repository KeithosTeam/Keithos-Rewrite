const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
			name: 'catfact',
			description: 'Says a random cat fact',
      example: 'catfact',
			aliases: ['meowfact', 'kittyfact'],
			type: client.types.FUN 
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            const res = await fetch('https://catfact.ninja/fact');
            const fact = (await res.json()).fact;
            const embed = new MessageEmbed()
              .setTitle('🐱  Cat Fact  🐱')
              .setDescription(fact)
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
