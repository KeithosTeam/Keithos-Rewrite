const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');
const { oneLine } = require('common-tags');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
            name: 'yomomma',
            aliases: ['yourmom', 'yomamma', 'yomama', 'ym'],
            usage: 'yomomma [user mention/ID]',
            description: oneLine`
              Says a random "yo momma" joke to the specified user. 
              If no user is given, then the joke will be directed at you!
            `,
            type: client.types.FUN,
            examples: ['yomomma @MCorange']
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        const member =  this.utils.getMemberFromMention(message, args[0]) || 
        message.guild.members.cache.get(args[0]) || 
        message.member;
        try {
            const res = await fetch('https://api.yomomma.info');
            let joke = (await res.json()).joke;
            joke = joke.charAt(0).toLowerCase() + joke.slice(1);
            if (!joke.endsWith('!') && !joke.endsWith('.') && !joke.endsWith('"')) joke += '!';
            const embed = new MessageEmbed()
                .setTitle('🍼  Yo Momma  🍼')
                .setDescription(`${member}, ${joke}`)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            message.client.logger.error(err.stack);
            this.sendErrorMessage(message, this, 'Please try again in a few seconds', err.message);
        }
	}
};
