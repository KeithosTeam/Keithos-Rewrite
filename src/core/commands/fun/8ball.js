const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');

const answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
  ];

module.exports = class eightball extends Command {
	constructor(client) {
		super(client, {
  			name: '8ball',
  			description: '',
        example: '',
  			aliases: ['', ''],
  			cooldown: 5,
  			toggleCooldown: false,
        ownerOnly: false,
        clientPemissions: [],
        userPermissions: [],
  			type: client.types.FUN//can be UTILITY, MINECRAFT, FUN, COLOR, INFO, POINTS, MISC, MOD, ADMIN, OWNER,
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
            const question = args.join(' ');
            if (!question) return this.utils.sendErrorMessage(message, 0, 'Please provide a question to ask');
            const embed = new MessageEmbed()
              .setTitle('🎱  The Magic 8-Ball  🎱')
              .addField('Question', question)
              .addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(message.guild.me.displayHexColor);
            message.channel.send({ embeds: [embed] });
	}
};
