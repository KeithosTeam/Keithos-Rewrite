const { MessageEmbed } = require('discord.js');
const schedule = require('node-schedule');
const { stripIndent } = require('common-tags');
const { cross } = require('./emoji.json');
const Schema = require('../models/config')
	
	function sendErrorMessage(message, command, errorType, reason, errorMessage) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {	
			const embed = new MessageEmbed()
				.setTitle(`${cross} Error: \`${command.name}\``)
				.setDescription(`**Error Type:**\`\`\`\n- ${errorType}\`\`\`\ \n**Reason:**\`\`\`\n+ ${reason}\`\`\``)
				.addField('Usage:', `\`\`\`${data.prefix}${command.example}\`\`\``)
				.setTimestamp()
				.setThumbnail(message.member.displayAvatarURL())
				.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
				.setColor(message.guild.me.displayHexColor);
	
			if (errorMessage) embed.addField('Error Message:', `\`\`\`s${errorMessage}\`\`\``);
	
			message.channel.send({ embeds: [embed] });
		});
	};

module.exports = {
	sendErrorMessage
};

