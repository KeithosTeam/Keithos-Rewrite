const { GuildMember, MessageEmbed } = require("discord.js");
const Event = require("../../Event");
const Schema = require("../../../models/config.js"); 

module.exports = class guildMember extends Event { 
	constructor (client) {
		super(client, {
			name: "guildMemberUpdate"
		});
	};
	/**
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 */
	run (oldMember, newMember) {
		//console.log('trigerred')
		//console.log(`Old Nickname: ${oldMember.nickname}\nNew Nickname: ${newMember.nickname}`)
		
		
			Schema.findOne({ _id: oldMember.guild.id }, async (err, data) => {
				//console.log(data);

				if (!data || !data.nickLog) {
					return;
				};
			if (oldMember.nickname !== newMember.nickname) {
				const oldNick = oldMember.nickname || 'None';
				const newNick = newMember.nickname || 'None';

				const channel = this.client.channels.cache.get(String(data.nickLog));
				if (channel && channel.type === "GUILD_TEXT") {
					return channel.send({
						embeds: [
							new MessageEmbed()
							.setTitle('Nickname Changed')
							.setColor('YELLOW')
							.setThumbnail(`${oldMember.user.avatarURL({ dynamic: true })}`)
							.addField('Change:', `\`${oldNick}\` ➔ \`${newNick}\``)
							.setTimestamp(Date.now())
						]
					}).catch(err => { 
						return console.log();
					});
				};
			}

			if (oldMember.roles.cache.size < newMember.roles.cache.size) {
				const role = newMember.roles.cache.difference(oldMember.roles.cache).first();

				const channel = this.client.channels.cache.get(String(data.roleLog));
				if (channel && channel.type === "GUILD_TEXT") {
					return channel.send({
						embeds: [
							new MessageEmbed()
							.setTitle('Roles Changed')
							.setColor('YELLOW')
							.setThumbnail(`${oldMember.user.avatarURL({ dynamic: true })}`)
							.addField('Change:', `\`${oldMember.user.tag}\` has been **given** the ${role} role`)
							.setTimestamp(Date.now())
						]
					}).catch(err => { 
						return console.log();
					});
				};
			}

			if (oldMember.roles.cache.size > newMember.roles.cache.size) {
				const role = newMember.roles.cache.difference(oldMember.roles.cache).first();

				const channel = this.client.channels.cache.get(String(data.roleLog));
				if (channel && channel.type === "GUILD_TEXT") {
					return channel.send({
						embeds: [
							new MessageEmbed()
							.setTitle('Roles Changed')
							.setColor('YELLOW')
							.setThumbnail(`${oldMember.user.avatarURL({ dynamic: true })}`)
							.addField('Change:', `\`${oldMember.user.tag}\` has been **removed** from ${role} role`)
							.setTimestamp(Date.now())
						]
					}).catch(err => { 
						return console.log();
					});
				};
			}
		})	

		
	  

	};
}
