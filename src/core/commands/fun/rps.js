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
        let userChoice;
        if (args.length) userChoice = args[0].toLowerCase();
        if (!rps.includes(userChoice)) 
          return this.utils.sendErrorMessage(message, 0, 'Please enter rock, paper, or scissors');
        userChoice = rps.indexOf(userChoice);
        const botChoice = Math.floor(Math.random()*3);
        let result;
        if (userChoice === botChoice) result = 'It\'s a draw!';
        else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = '**Calypso** wins!';
        else result = `**${message.member.displayName}** wins!`;
        const embed = new MessageEmbed()
          .setTitle(`${message.member.displayName} vs. Calypso`)
          .addField('Your Choice:', res[userChoice], true)
          .addField('Keith\'s Choice', res[botChoice], true)
          .addField('Result', result, true)
          .setFooter(message.member.displayName,  message.author.avatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
	}
};
