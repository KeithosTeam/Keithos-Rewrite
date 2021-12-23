const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const fetch = require('node-fetch');

module.exports = class catfact extends Command {
	constructor(client) {
		super(client, {
			name: 'coinflip',
			description: 'Flips a coin',
            example: 'coinflip',
			aliases: ['cointoss', 'coin', 'flip'],
			type: client.types.FUN 
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'heads';
        else result = 'tails';
        const embed = new MessageEmbed()
          .setTitle('½  Coinflip  ½')
          .setDescription(`I flipped a coin for you, ${message.member}. It was **${result}**!`)
          .setFooter(message.member.displayName,  message.author.avatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
	}
};
