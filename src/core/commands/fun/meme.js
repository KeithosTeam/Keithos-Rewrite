const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class duck extends Command {
	constructor(client) {
		super(client, {
      name: 'meme',
      usage: 'meme',
      description: 'Displays a random meme from the `memes`, `dankmemes`, or `me_irl` subreddits.',
      type: client.types.FUN
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
