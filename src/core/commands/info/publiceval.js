const { Message, MessageEmbed } = require('discord.js');
const Command = require('../../Command');
const tio = require('tio.js');
var stringSimilarity = require('string-similarity');


module.exports = class publiceval extends Command {
	constructor(client) {
		super(client, {
			name: 'publiceval',
			description: 'Literally run a whole code using this command',
			aliases: ['publiccoderun', 'peval'],
			example: 'peval js <code>',
			type: client.types.INFO
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {

        let lang = args[0]
        args.shift()

        if (lang == '?' || lang =='help' || lang =='h'){
            message.channel.send({ content: 'Do =peval find javascript' });
        } else if (lang == 'find'){
            const languages = await tio.languages();
            var matches = stringSimilarity.findBestMatch(args[0], languages);
            //console.log(args)
            //console.log(matches)
            var getSimilar = [];
            for(var i in matches.ratings){
            if(matches.ratings[i].rating > 0.2){
            getSimilar.push(matches.ratings[i].target);
            }
            }
            //console.log(getSimilar)
            let embed = new MessageEmbed()
            .setTitle(`${this.emoji.tick}Languages found:`)
            .setColor('AQUA')
            .addField('Input', `\`\`\`js\n${args[0]}\`\`\``)
            .addField('Similar languages', `\`\`\`\n${getSimilar}\`\`\``)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();


        message.channel.send({ embeds: [embed] });
        return
        }   

		const code = args.join(' ');
        //console.log(code)

		const error = new MessageEmbed()
			.setTitle(`${this.emoji.cross} Error:`)
			.setColor('AQUA')
			.setDescription('Please provide code to run')
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (!code) {
			return message.channel.send({ embeds: [error] });
		}
		try {
            if(lang == 'js') lang ='javascript-node'
            if(lang == 'nodejs') lang ='javascript-node'
			let evaled = await tio(code, lang)



			if (typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled, { depth: 0 });
			}


			let embed = new MessageEmbed()
				.setTitle(`${this.emoji.tick}Eval`)
				.setColor('AQUA')
				.addField('Input', `\`\`\`js\n${code}\`\`\``)
                .addField('Output', `\`\`\`\n${evaled.output}\`\`\``)
				.addField('Stats', `\`\`\`\n${evaled || 'Evaled'}\`\`\``)
				.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();


			message.channel.send({ embeds: [embed] });

		} catch (error) {
            console.log(error)
			const err = new MessageEmbed()
				.setTitle(`${this.emoji.cross}Error:`)
				.setDescription(String.apply(error))
				.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			message.channel.send({ embeds: [err] });
		}
	}
};
