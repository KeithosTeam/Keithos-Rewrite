const { MessageEmbed } = require('discord.js');
// const schedule = require('node-schedule');
// const { stripIndent } = require('common-tags');
const { fail } = require('./emoji.json');
const Schema = require('../models/config');
	
function sendErrorMessage(message, command, reason='None', errorMessage='None', errorType='Command Failure') {
	Schema.findOne({ _id: message.guild.id }, async (e, data) => {	
		const embed = new MessageEmbed()
			.setTitle(`${fail} Error: \`${command.name}\``)
			.setDescription(`**Reason:**\`\`\`diff\n- ${errorType}\n+ ${reason}\`\`\``) /** `**Error Type:**\`\`\`\n- ${errorType}\`\`\`\ \n*/
			.addField('Usage:', `\`${data.prefix}${command.usage}\``)
			.setTimestamp()
			.setThumbnail(message.member.displayAvatarURL())
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(message.guild.me.displayHexColor);
			
		if (command.examples) embed.addField('Examples', command.examples.map(e => `\`${data.prefix}${e}\``).join('\n'));

		if (errorMessage) embed.addField('Error Message:', `\`\`\`${errorMessage}\`\`\``);

		message.channel.send({ embeds: [embed] });
	});
}

/**
   * Creates and sends mod log embed
   * @param {Message} message
   * @param {string} reason 
   * @param {Object} fields
   */
async function sendModLogMessage(message, reason, action, fields = {}) {
	Schema.findOne({ _id: message.guild.id }, async (e, data) => {
		const modLogId = data.modLog;
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
				.setFooter({ text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
				.setColor(message.guild.me.displayHexColor);
			for (const field in fields) {
				embed.addField(field, fields[field], true);
			}
			embed.addField('Reason', reason);
			modLog.send({ embeds: [embed]});
		}
	});
}

/**
   * Gets member from mention
   * @param {Message} message 
   * @param {string} mention 
   */
function getMemberFromMention(message, mention) {
	if (!mention) return;
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return message.guild.members.cache.get(id);
}

/**
   * Gets role from mention
   * @param {Message} message 
   * @param {string} mention 
   */
function getRoleFromMention(message, mention) {
	if (!mention) return;
	const matches = mention.match(/^<@&(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return message.guild.roles.cache.get(id);
}

/**
   * Gets text channel from mention
   * @param {Message} message 
   * @param {string} mention 
   */
function getChannelFromMention(message, mention) {
	if (!mention) return;
	const matches = mention.match(/^<#(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return message.guild.channels.cache.get(id);
}





/**
 * Gets current array window range
 * @param {Array} arr
 * @param {int} current
 * @param {int} interval
 */
function getRange(arr, current, interval) {
	const max = (arr.length > current + interval) ? current + interval : arr.length;
	current = current + 1;
	const range = (arr.length == 1 || arr.length == current || interval == 1) ? `[${current}]` : `[${current} - ${max}]`;
	return range;
}



function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = {
	sendErrorMessage,
	sendModLogMessage,
	getMemberFromMention,
	getRoleFromMention,
	getChannelFromMention,
	// ReactionMenu,
	getRange,
	capitalize
};

