const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
            name: 'dogfact',
            aliases: ['puppyfact', 'pupfact', 'doggofact', 'pupperfact'],
            usage: 'dogfact',
            description: 'Finds a random dog fact.',
            type: client.types.FUN
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            const res = await fetch('https://dog-api.kinduff.com/api/facts');
            const fact = (await res.json()).facts[0];
            const embed = new MessageEmbed()
              .setTitle('🐶  Dog Fact  🐶')
              .setDescription(fact)
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
