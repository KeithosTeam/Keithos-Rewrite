const { Message, MessageEmbed } = require('discord.js');// hey
const Schema = require('../../../models/config');
const Command = require('../../Command');

module.exports = class joinLog extends Command {
	constructor(client) {
		super(client, {
			name: 'config',
			description: 'edit the settings',
			type: client.types.ADMIN,
			aliases: ['cfg', 'settings'],
			cooldown: 8,
			example: 'config prefix .',
			toggleCooldown: false,
			userPermissions: ['MANAGE_GUILD']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run (message, args) {

		var tmp = args.join('~').toLowerCase()
		var args = tmp.split('~')

		Schema.findOne({ _id: message.guild.id }, async (e, data) => {

			if (!data) {
				message.channel.send({ content: 'Data for this server does not exist. please kick and reinvite the bot.'})
			}
            
        if ( args[0] == 'help' || args[0] == '?' || !args[0]) {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Keithos configs')
                    .setColor('BLUE')
                    .setThumbnail(`${message.member.user.displayAvatarURL({ dynamic: true })}`)
                    .addField('Prefix', `\`${data.prefix}\``, true)
					.addField('Message Log Channel', `<#${data.messageLog}>`, true)
					.addField('Join Log Channel', `<#${data.joinLog}>`, true)
					.addField('Leave Log Channel', `<#${data.leaveLog}>`, true)
					.addField('Nickname Log Channel', `<#${data.nickLog}>`, true)
					.addField('Role Log Channel', `<#${data.joinLog}>`, true)
                    .setTimestamp(Date.now())
                ]
            }).catch(err => { 
                return;
            });

        } else if (args[0] == 'prefix') {

			const prefixEmbed = new MessageEmbed()
			.setTitle('Prefix')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let prefix = args[1];
			const oldPrefix = data.prefix;

			if (!args[1]) {
				message.channel.send({ embeds: [prefixEmbed.addField('Hey!', `The prefix for this guild is \`${data.prefix}\``)] });
				return;
			}

			if (prefix.length > 4) {
				message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix cannot be more than \`4\` chars!`)] });
			}
	
			if (data.prefix === prefix) {
				message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix is already \`${data.prefix}\``)] });
			}

			return data.updateOne({ _id: message.guild.id, prefix: prefix }).then(() => {
				message.channel.send({ embeds: [prefixEmbed.addField('Success!', `${this.emoji.tick} Prefix has been changed from \`${oldPrefix}\` to \`${prefix}\``)] });
			});

		} else if (args[0] == 'messagelog' || args[0] == 'msg' || args[0] == 'message' || args[0] == 'msglog' || args[0] == 'mlc') {

			const Embed = new MessageEmbed()
			.setTitle('Message Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let nlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || '`None`';
			
			const oldnlc = `<#${data.messageLog}>` || '`None`';

			if (!args[1]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Nickname Log Channel for this guild is ${oldnlc}`)] });
				return;
			}

			if (args[1] == 'none'){
				return data.updateOne({ _id: message.guild.id, nickLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Nickname Log Channel has been changed from ${oldnlc} to \`none\``)] });
				});
				}

			if (nlc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldnlc === nlc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Message Log Channel is already ${oldnlc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, messageLog: nlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Message Log Channel has been changed from ${oldnlc} to ${nlc}`)] });
			});

		} else if (args[0] == 'nicklog' || args[0] == 'nick' || args[0] == 'nickname' || args[0] == 'nicknamelog' || args[0] == 'nlc') {

			const Embed = new MessageEmbed()
			.setTitle('Nickname Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let nlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || '`None`';
			
			const oldnlc = `<#${data.nickLog}>` || '`None`';

			if (!args[1]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Nickname Log Channel for this guild is ${oldnlc}`)] });
				return;
			}

			if (args[1] == 'none'){
				return data.updateOne({ _id: message.guild.id, nickLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Nickname Log Channel has been changed from ${oldnlc} to \`none\``)] });
				});
				}

			if (nlc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldnlc === nlc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Nickname Log Channel is already ${oldnlc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, nickLog: nlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Nickname Log Channel has been changed from ${oldnlc} to ${nlc}`)] });
			});

		} else if (args[0] == 'rolelog' || args[0] == 'role' || args[0] == 'rlc') {

			const Embed = new MessageEmbed()
			.setTitle('Role Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let rlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || '`None`';
			
			const oldrlc = `<#${data.roleLog}>` || '`None`';

			if (!args[1]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Role Log Channel for this guild is ${oldrlc}`)] });
				return;
			}

			if (args[1] == 'none'){
				return data.updateOne({ _id: message.guild.id, roleLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Role Log Channel has been changed from ${oldrlc} to \`none\``)] });
				});
				}

			if (rlc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldrlc === rlc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Role Log Channel is already ${olrlc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, nickLog: rlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Nickname Log Channel has been changed from ${oldrlc} to ${rlc}`)] });
			});

		} else if (args[0] == 'joinlog' || args[0] == 'joinchannel' || args[0] == 'welcome' || args[0] == 'join' || args[0] == 'welcomechannel') {

			const Embed = new MessageEmbed()
			.setTitle('Welcome Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let jlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || '`None`';
			
			const oldjlc = `<#${data.joinLog}>` || '`None`';

			if (!args[1]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Welcome Log Channel for this guild is ${oldjlc}`)] });
				return;
			}

			if (args[1] == 'none'){
				return data.updateOne({ _id: message.guild.id, joinLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Welcome Log Channel has been changed from ${oldjlc} to \`none\``)] });
				});
				}

			if (jlc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldjlc === jlc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Welcome Log Channel is already ${oldjlc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, joinLog: jlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Welcome Log Channel has been changed from ${oldjlc} to ${jlc}`)] });
			});

		} else if (args[0] == 'leavelog' || args[0] == 'leavechannel' || args[0] == 'farewell' || args[0] == 'leave' || args[0] == 'farewellchannel') {

			const Embed = new MessageEmbed()
			.setTitle('Farewell Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let llc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || '`None`';
			
			const oldllc = `<#${data.joinLog}>` || '`None`';

			if (!args[1]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Farewell Channel for this guild is ${oldjlc}`)] });
				return;
			}

			if (args[1] == 'none'){
				return data.updateOne({ _id: message.guild.id, leaveLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Farewell Channel has been changed from ${oldllc} to \`none\``)] });
				});
				}

			if (llc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldllc === llc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Farewell Channel is already ${oldllc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, leaveLog: llc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Farewell Channel has been changed from ${oldllc} to ${llc}`)] });
			});

		}

			data.save();
		});



	}
};
