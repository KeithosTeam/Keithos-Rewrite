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
 /**
 * --------------------------------------
 * Help Tab
 * --------------------------------------
 */          
        if ( args[0] == 'help' || args[0] == 'h' || args[0] == '?' || !args[0]) {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Keithos configs')
                    .setColor('BLUE')
                    .setThumbnail(`${message.member.user.displayAvatarURL({ dynamic: true })}`)
                    .addField('Main', `\`1 Setting\``, true)
					.addField('Logging', `\`6 Settings\``, true)
					.addField('Welcomes and farewells', `\`4 Settings\``, true)
                    .setTimestamp(Date.now())
                ]
            }).catch(err => { 
                return;
            });
/**
 * --------------------------------------
 * Main Tab
 * --------------------------------------
 */
        } else if (args[0] == 'Main' || args[0] == 'main') {

			const oldPrefix = data.prefix;

			if(!args[1]){
			

			const Embed = new MessageEmbed()
			.setTitle('Main settings')
			.setColor(this.client.config.embed.color)
			.addField('Prefix', `\`${oldPrefix}\``)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			message.channel.send({ embeds: [Embed] })

			} else if(args[1] == 'prefix') {
				const prefixEmbed = new MessageEmbed()
				.setTitle('Prefix')
				.setColor(this.client.config.embed.color)
				.setThumbnail(this.client.user.displayAvatarURL())
				.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
				
				
				let prefix = args[2];
				

				if (!args[2]) {
					message.channel.send({ embeds: [prefixEmbed.addField('Hey!', `The prefix for this guild is \`${data.prefix}\``)] });
					return;
				}

				if (prefix.length > 4) {
					return message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix cannot be more than \`4\` chars!`)] });
				}
		
				if (data.prefix === prefix) {
					message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix is already \`${data.prefix}\``)] });
				}

				return data.updateOne({ _id: message.guild.id, prefix: prefix }).then(() => {
					message.channel.send({ embeds: [prefixEmbed.addField('Success!', `${this.emoji.tick} Prefix has been changed from \`${oldPrefix}\` to \`${prefix}\``)] });
				});

/**
 * --------------------------------------
 * Ip
 * --------------------------------------
 */
			} else if(args[1] == 'ip') {
				const prefixEmbed = new MessageEmbed()
				.setTitle('Prefix')
				.setColor(this.client.config.embed.color)
				.setThumbnail(this.client.user.displayAvatarURL())
				.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

				let oldIp = data.ip;
				let ip = args[2];
				

				if (!args[2]) {
					message.channel.send({ embeds: [prefixEmbed.addField('Hey!', `The ip for this guild is \`${data.ip}\``)] });
					return;
				}

				if (args[2] == 'none'){
					return data.updateOne({ _id: message.guild.id, ip: undefined  }).then(() => {
						message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Message Log Channel has been changed from ${oldmlc} to \`None\``)] });
					});
					}
		
				if (data.prefix === prefix) {
					message.channel.send({ embeds: [prefixEmbed.addField('Error:', `${this.emoji.cross} Prefix is already \`${data.prefix}\``)] });
				}

				return data.updateOne({ _id: message.guild.id, ip: ip }).then(() => {
					message.channel.send({ embeds: [prefixEmbed.addField('Success!', `${this.emoji.tick} Ip has been changed from \`${oldIp}\` to \`${ip}\``)] });
				});
			}

/**
 * --------------------------------------
 * Logging Tab
 * --------------------------------------
 */

		} else if(args[0] == 'Logging' || args[0] == 'logging' || args[0] == 'log' || args[0] == 'logs'){

			if(!args[1]){

				const messageLog = message.guild.channels.cache.get(data.messageLog) || '`None`';
				const nickLog = message.guild.channels.cache.get(data.nickLog) || '`None`';
				const roleLog = message.guild.channels.cache.get(data.roleLog) || '`None`';
				const joinLog = message.guild.channels.cache.get(data.joinLog) || '`None`';
				const leaveLog = message.guild.channels.cache.get(data.leaveLog) || '`None`';
				const modLog = message.guild.channels.cache.get(data.modLog) || '`None`';
		
					const Embed = new MessageEmbed()
					.setTitle('Logging settings')
					.setColor(this.client.config.embed.color)
					.addField('Message log', `${messageLog}`, true)
					.addField('Nickname log', `${nickLog}`, true)
					.addField('Role log', `${roleLog}`, true)
					.addField('Join log', `${joinLog}`, true)
					.addField('Leave log', `${leaveLog}`, true)
					.addField('Mod log', `${modLog}`, true)
					.setThumbnail(this.client.user.displayAvatarURL())
					.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
					.setTimestamp();
					
					message.channel.send({ embeds: [Embed] })

			}


/**
 * --------------------------------------
 * MsgLog
 * --------------------------------------
 */

			if (args[1] == 'messagelog' || args[1] == 'msg' || args[1] == 'message' || args[1] == 'msglog' || args[1] == 'mlc') {

			const Embed = new MessageEmbed()
			.setTitle('Message Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let mlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldmlc = message.guild.channels.cache.get(data.messageLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Message Log Channel for this guild is ${oldmlc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, messageLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Message Log Channel has been changed from ${oldmlc} to \`None\``)] });
				});
				}

			if (mlc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldmlc === mlc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Message Log Channel is already ${oldmlc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, messageLog: nlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Message Log Channel has been changed from ${oldmlc} to ${mlc}`)] });
			});


/**
 * --------------------------------------
 * NickLog
 * --------------------------------------
 */
		} else if (args[1] == 'nicklog' || args[1] == 'nick' || args[1] == 'nickname' || args[1] == 'nicknamelog' || args[1] == 'nlc') {

			const Embed = new MessageEmbed()
			.setTitle('Nickname Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let nlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldnlc = message.guild.channels.cache.get(data.nickLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Nickname Log Channel for this guild is ${oldnlc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, nickLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Nickname Log Channel has been changed from ${oldnlc} to \`None\``)] });
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
/**
 * --------------------------------------
 * RoleLog
 * --------------------------------------
 */
		} else if (args[1] == 'rolelog' || args[1] == 'role' || args[1] == 'rlc') {

			const Embed = new MessageEmbed()
			.setTitle('Role Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let rlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldrlc = message.guild.channels.cache.get(data.roleLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Role Log Channel for this guild is ${oldrlc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, roleLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Role Log Channel has been changed from ${oldrlc} to \`None\``)] });
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
/**
 * --------------------------------------
 * joinLog
 * --------------------------------------
 */
		}	else if (args[1] == 'joinlog' || args[1] == 'joinchannel' || args[1] == 'welcome' || args[1] == 'join' || args[1] == 'welcomechannel') {

			const Embed = new MessageEmbed()
			.setTitle('Welcome Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let jlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldjlc = message.guild.channels.cache.get(data.joinLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Join Log Channel for this guild is ${oldjlc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, joinLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Join Log Channel has been changed from ${oldjlc} to \`None\``)] });
				});
				}

			if (jlc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldjlc === jlc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Join Log Channel is already ${oldjlc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, joinLog: jlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Join Log Channel has been changed from ${oldjlc} to ${jlc}`)] });
			});


/**
 * --------------------------------------
 * leaveLog
 * --------------------------------------
 */
		} else if (args[1] == 'leavelog' || args[1] == 'leavechannel' || args[1] == 'farewell' || args[1] == 'leave' || args[1] == 'farewellchannel') {

			const Embed = new MessageEmbed()
			.setTitle('Leave Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let llc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldllc = message.guild.channels.cache.get(data.joinLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Leave Channel for this guild is ${oldjlc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, leaveLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Leave Channel has been changed from ${oldllc} to \`None\``)] });
				});
				}

			if (llc.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}
	
			if (oldllc === llc) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Leave Channel is already ${oldllc}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, leaveLog: llc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Leave Channel has been changed from ${oldllc} to ${llc}`)] });
			});

/**
 * --------------------------------------
 * modLogs
 * --------------------------------------
 */
		}  if (args[1] == 'modlogs' || args[1] == 'modlog' || args[1] == 'ml' || args[1] == 'mlc' || args[1] == 'modlogchannel') {

			const Embed = new MessageEmbed()
			.setTitle('Mod Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			//let lm = args.shift.shift.join(' ') || '`None`';
            let lm = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldlm = dmessage.guild.channels.cache.get(data.modLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Mod Log channel for this guild is ${oldlm}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, modLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Mod Log Channel has been changed from ${oldlm}\` to \`None\``)] });
				});
				}

			if (lm.type !== 'GUILD_TEXT') {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Only guild text channel is allowed`)] });
				return;
			}

	
			if (oldlm === lm) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Mod Log Channel is already ${lm}`)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, modLog: lm  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Mod Log Channel has been changed from ${oldlm} to ${lm}`)] });
			});
		}

/**
 * --------------------------------------
 * Joins and leaves tab
 * --------------------------------------
 */

	} else if (args[0] == 'join' || args[0] == 'leave' || args[0] == 'welcome' || args[0] == 'user' || args[0] == 'farewell') {

		if(!args[1]){
			
			const welcomeLog = message.guild.channels.cache.get(data.welcomeLog) || '`None`';
			const farewellLog = message.guild.channels.cache.get(data.farewellLog) || '`None`';

			const Embed = new MessageEmbed()
			.setTitle('Join and leave settings')
			.setColor(this.client.config.embed.color)
			.addField('Welcome channel', `${welcomeLog}`, true)
			.addField('Join message', `\`${data.joinMsg || 'none'}\``, true)
			.addField('Farewell channel', `${farewellLog}`, true)
			.addField('Leave message', `\`${data.leaveMsg || 'none'}\``, true)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			message.channel.send({ embeds: [Embed] })
/**
 * --------------------------------------
 * welcomeLog
 * --------------------------------------
 */
	} else if (args[1] == 'welcomelog' || args[1] == 'welcomechannel' || args[1] == 'welcome' || args[1] == 'wlcm' || args[1] == 'wcc') {

			const Embed = new MessageEmbed()
			.setTitle('Welcome Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let jlc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldjlc = message.guild.channels.cache.get(data.welcomeLog) || '`None`';


			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Welcome Log Channel for this guild is ${oldjlc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, welcomeLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Welcome Log Channel has been changed from ${oldjlc} to \`None\``)] });
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

			return data.updateOne({ _id: message.guild.id, welcomeLog: jlc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Welcome Log Channel has been changed from ${oldjlc} to ${jlc}`)] });
			});
/**
 * --------------------------------------
 * farewellLog
 * --------------------------------------
 */
		} else if (args[1] == 'farewelllog' || args[1] == 'farewellchannel' || args[1] == 'farewell' || args[1] == 'bye' || args[1] == 'fwc') {

			const Embed = new MessageEmbed()
			.setTitle('Farewell Log Channel')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			let llc =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
			
			const oldllc = message.guild.channels.cache.get(data.farewellLog) || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Farewell Channel for this guild is ${oldllc}`)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, farewellLog: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Farewell Channel has been changed from ${oldllc} to \`None\``)] });
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

			return data.updateOne({ _id: message.guild.id, farewellLog: llc  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Farewell Channel has been changed from ${oldllc} to ${llc}`)] });
			});

/**
 * --------------------------------------
 * joinMsg
 * --------------------------------------
 */
		} else if (args[1] == 'joingmessage' || args[1] == 'joinmsg' || args[1] == 'welcomemessage' || args[1] == 'wm' || args[1] == 'wmsg') {
            
			const Embed = new MessageEmbed()
			.setTitle('Welcome Message')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			//let jm = message.content.slice(message.content.indexOf(args[2]), message.content.length);
            
			let jm = args.slice(2).join(' ');
            console.log('result: ' + jm)
            console.log('Args: '+args)
			const oldjm = `${data.joinMsg}` || 'None';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Welcome message for this guild is \`${oldjm}\``)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, joinMsg: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Welcome message has been changed from \`${oldjm}\` to \`None\``)] });
				});
				}

	
			if (oldjm === jm) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Welcome message is already \`${jm}\``)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, joinMsg: jm  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Welcome Message has been changed from \`${oldjm}\` to \`${jm}\``)] });
			});
/**
 * --------------------------------------
 * leavemsg
 * --------------------------------------
 */
		} else if (args[1] == 'farewellmessage' || args[1] == 'leavemessage' || args[1] == 'leavemsg' || args[1] == 'lm' || args[1] == 'lmsg') {

			const Embed = new MessageEmbed()
			.setTitle('Farewell Message')
			.setColor(this.client.config.embed.color)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
			
			//let lm = args.shift.shift.join(' ') || '`None`';
            let lm = message.content.slice(message.content.indexOf(args[2]), message.content.length) || '`None`';
			
			const oldlm = data.leaveMsg || '`None`';

			if (!args[2]) {
				message.channel.send({ embeds: [Embed.addField('Hey!', `The Farewell message for this guild is \`${oldlm}\``)] });
				return;
			}

			if (args[2] == 'none'){
				return data.updateOne({ _id: message.guild.id, leaveMsg: undefined  }).then(() => {
					message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Farewell message has been changed from \`${oldlm}\` to \`None\``)] });
				});
				}

	
			if (oldlm === lm) {
				message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.cross} Farewell message is already \`${lm}\``)] });
				return
			}

			return data.updateOne({ _id: message.guild.id, leaveMsg: lm  }).then(() => {
				message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.tick} Farewell Message has been changed from \`${oldlm}\` to \`${lm}\``)] });
			});
		}
		}

			data.save();
		});



	}
};