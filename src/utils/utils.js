const { MessageEmbed } = require('discord.js');
const schedule = require('node-schedule');
const { stripIndent } = require('common-tags');
const { cross } = require('./emoji.json');
const Schema = require('../models/config')
	
	function sendErrorMessage(message, command, reason, errorMessage) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {	
			const embed = new MessageEmbed()
				.setTitle(`${cross} Error: \`${command.name}\``)
				.setDescription(/** `**Error Type:**\`\`\`\n- ${errorType}\`\`\`\ \n*/`**Reason:**\`\`\`\n+ ${reason}\`\`\``)
				.addField('Usage:', `\`\`\`${data.prefix}${command.example}\`\`\``)
				.setTimestamp()
				.setThumbnail(message.member.displayAvatarURL())
				.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
				.setColor(message.guild.me.displayHexColor);
	
			if (errorMessage) embed.addField('Error Message:', `\`\`\`s${errorMessage}\`\`\``);
	
			message.channel.send({ embeds: [embed] });
		});
	};

	  /**
   * Creates and sends mod log embed
   * @param {Message} message
   * @param {string} reason 
   * @param {Object} fields
   */
	   async function sendModLogMessage(message, reason, action, fields = {}) {
		   console.log(this.name)
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
		const modLogId = data.modLog
		const modLog = message.guild.channels.cache.get(modLogId); 
		if (
		  modLog &&
		  modLog.viewable &&
		  modLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
		) {
		  const embed = new MessageEmbed()
			.setTitle(`Action: \`${action}\``)
			.addField('Moderator', message.member, true)
			.setTimestamp()
			.setThumbnail(message.member.displayAvatarURL())
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(message.guild.me.displayHexColor);
		  for (const field in fields) {
			console.log('lul')
			embed.addField(field, fields[field], true);
		  }
		  embed.addField('Reason', reason);
		  modLog.send({ embeds: [embed]})
		}
	})
	  }
module.exports = {
	sendErrorMessage,
	sendModLogMessage
};

