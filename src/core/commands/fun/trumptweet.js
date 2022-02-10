const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
            name: 'trumptweet',
            aliases: ['trump'],
            usage: 'trumptweet <message>',
            description: 'Display\'s a custom tweet from Donald Trump with the message provided.',
            type: client.types.FUN,
            examples: ['trumptweet Keithos is the best Discord Bot!']
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        if (!args[0]) return this.utils.sendErrorMessage(message, this, 'Please provide a message to tweet');
        let tweet = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';
    
        try {
          const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
          const img = (await res.json()).message;
          const embed = new MessageEmbed()
            .setTitle(':flag_us:  Trump Tweet  :flag_us: ')
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
