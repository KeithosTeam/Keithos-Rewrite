const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
            name: 'yesno',
            aliases: ['yn'],
            usage: 'yesno',
            description: 'Fetches a gif of a yes or a no.',
            type: client.types.FUN
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        try {
            const res = await (await fetch('http://yesno.wtf/api/')).json();
            let answer = this.utils.capitalize(res.answer);
            if (answer === 'Yes') answer = '👍  ' + answer + '!  👍';
            else if (answer === 'No') answer = '👎  ' + answer + '!  👎';
            else answer = '👍  ' + answer + '...  👎';
            const img = res.image;
            const embed = new MessageEmbed()
              .setTitle(answer)
              .setImage(img)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] })
          } catch (err) {
            message.client.logger.error(err.stack);
            this.utils.sendErrorMessage(message, this, 'Please try again in a few seconds', err.message);
          }
	}
};
