const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');

module.exports = class duck extends Command {
	constructor(client) {
		super(client, {
            name: 'emojify',
            aliases: ['sayemoji'],
            usage: 'emojify <message>',
            description: 'Swaps every letter within the provided message with an emoji.',
            type: client.types.FUN,
            examples: ['emojify hello world']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            let res = await fetch('https://meme-api.herokuapp.com/gimme');
            res = await res.json();
            const embed = new MessageEmbed()
              .setTitle(res.title)
              .setImage(res.url)
              .setFooter(message.member.displayName,  message.author.avatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] });
          } catch (err) {
            this.client.logger.error(err.stack);
            this.utils.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
          }
          
	}
};
