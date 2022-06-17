const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const process = require('process');
const { oneLine, stripIndent } = require('common-tags');
const emoji = require('../../../utils/emoji.json');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			description: 'Returns the bot info.',
			examples: ['botinfo'],
			aliases: [],
			cooldown: 5,
			toggleCooldown: false,
			ownerOnly: false,
			clientPemissions: [],
			userPermissions: [],
			type: client.types.INFO  
		});
	}
	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */
	async run(message, args) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const botOwners = message.client.config.owners;
			const prefix = data.prefix;
			const tech = stripIndent`
			Version     :: ${message.client.pkg.version}
			Library     :: Discord.js ${message.client.pkg.dependencies['discord.js']}
			Environment :: Node.js ${process.version}
			Database    :: MongoDB ${message.client.pkg.dependencies['mongoose']}
			`;
			const embed = new MessageEmbed()
				.setTitle('Keithos Bot Information')
				.setDescription(oneLine`
					Keithos is an open source, fully customizable Discord bot that is constantly growing.
					He comes packaged with a variety of commands and 
					a multitude of settings that can be tailored to your server's specific needs. 
					his codebase also serves as a base framework to easily create Discord bots of all kinds..
				`)
				.addField('Prefix', `\`${prefix}\``, true)
				.addField('Client ID', `\`${message.client.user.id}\``, true);
				// .addField(`Developer ${owner}`, botOwner, true)
			let str = '';
			for (let i = 0; i < botOwners.length; i++){
				// embed.addField(`Developer ${':crown:'}`, `<@${botOwners[i]}>`, true);
				str += `<@${botOwners[i]}> \n`;
			} 
			embed
				.addField(`Developers ${emoji.crown || ':crown:'}`, str, true)
				.addField('Tech', `\`\`\`asciidoc\n${tech}\`\`\``)
				.addField(
					'Links', 
					'**[Invite Me](' + message.client.config.links.invite +  ') | ' +
					'[Support Server]( ' + message.client.config.links.support + ') | ' +
					'[Repository](' + message.client.config.links.github +')**'
				)
				// .setImage('https://raw.githubusercontent.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
				.setFooter({text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);
			message.channel.send({ embeds: [embed] });
		}
		);
	}
};
