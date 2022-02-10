const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const cfg = require('./config_layout.json')
const none = '\`None\`';
//console.log(cfg.config[0].names)

module.exports = class config extends Command {
	constructor(client) {
		super(client, {
			name: 'config',
			description: 'edit the settings',
			type: client.types.ADMIN,
            usage: 'config <tab> <setting> <value>',
            examples: ['config main prefix k.', 'config main prefix','config main','config'],
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
	async run(message, args) {

        if (args) {
            let tmp = args.join('~').toLowerCase()
            args = tmp.split('~')
        }
        let config = cfg.config

        Schema.findOne({ _id: message.guild.id }, async (e, data) => {

            if (!data) {
				data = new Schema({ _id: message.guild.id });
				data.save();
            }
            let x = 0;
            let tabs = {
                "main": [],
                "logging": [],
                "welcomes": []
            }

            while (x < config.length){
                eval(`tabs.${config[x].tab}.push("${config[x].names[0]}")`)
                x++
            }
            x=0
            while (x + 1 <= config.length){
                if (!args[0]){
                    const embed = new MessageEmbed()
                        .setTitle('Keithos configs')
                        .setColor('BLUE')
                        .setThumbnail(`${message.member.user.displayAvatarURL({ dynamic: true })}`)
                        .addField('Main', `\`${tabs.main.length} Settings\``, true)
                        .addField('Logging', `\`${tabs.logging.length} Settings\``, true)
                        .addField('Welcomes and farewells', `\`${tabs.welcomes.length} Settings\``, true)
                        

                    return message.channel.send({embeds: [embed]})
                } 

                if (args[0] && !args[1]) {

                    let embed = new MessageEmbed()
                        .setTitle(`Keithos ${args[0]}`)
                        .setColor('BLUE')
                        .setThumbnail(`${message.member.user.displayAvatarURL({ dynamic: true })}`)
                        .setFooter('You cant use spaces in names. \nTry replacing spaces in setting names with _.\nExample: message_log_channel\n-')
                        .setTimestamp(Date.now())
                    let z=0;
                    const len = config.length
                    while(z < len){
                        if (config[z].tab == args[0]){
                            let value = eval(`data.${config[z].dbname}`) 
                            const type = config[z].type
                            if ( type == "string" ) {
                                value = `\`${value || 'None'}\``
                            } else
                            if ( type == "channel" ){
                                value = message.guild.channels.cache.get(value) || '`None`';
                            } else
                            if ( type == "role" ){
                                value = message.guild.roles.cache.get(value) || '`None`';
                            }

                            embed.addField(`${config[z].title}`, `${value || '`None`'}`, true)
                        }
                        z++
                    }
                    return message.channel.send({embeds: [embed]})
                }

                if (config[x].tab == args[0] && config[x].names.includes(args[1])) {

                    const Embed = new MessageEmbed()
                    .setTitle(config[x].title)
                    .setColor(this.client.config.embed.color)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    
                    let value;
                    let oldValue = eval(`data.${config[x].dbname}`);
                    let type;

                    if (!args[2]) {
                        if(config[x].type === "string"){
                            return message.channel.send({ embeds: [Embed.addField('Hey!', `The ${config[x].title} for this guild is \`${oldValue || "None"}\``)] });
                        } else if(config[x].type === "channel") {
                            const oldChannel = message.guild.channels.cache.get(oldValue) || '`None`';
                            return message.channel.send({ embeds: [Embed.addField('Hey!', `The ${config[x].title} for this guild is ${oldChannel}`)] });
                        } else if(config[x].type === "role") {
                            const oldRole = message.guild.roles.cache.get(oldValue) || '`None`';
                            return message.channel.send({ embeds: [Embed.addField('Hey!', `The ${config[x].title} for this guild is ${oldRole}`)] });
                        }
                    }
        
                    if (args[2] == 'none'){
                        if (config[x].dbname == "prefix") {
                            return this.utils.sendErrorMessage(message, this, 'The prefix cant be \'None\'');
                        }
                        if(config[x].type === "string"){
                            oldValue = `\`${oldValue}\``
                        } else if(config[x].type === "channel") {
                            oldValue = message.guild.channels.cache.get(oldValue) || '`None`'
                        } else if(config[x].type === "role") {
                            oldValue = message.guild.roles.cache.get(oldValue) || '`None`'
                        }
                        return eval(`data.updateOne({ _id: message.guild.id, ${config[x].dbname}: undefined })`).then(() => {
                            message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.success} ${config[x].title} has been changed from ${oldValue} to \`None\``)] });
                        });
                        }

                    switch(config[x].type){
                        case "string":{
                            oldValue = `\`${ eval(`data.${config[x].dbname}`) }\``
                            value = `\`${args[2]}\``;
                            break;
                        }
                        case "channel":{
                            oldValue = eval(`message.guild.channels.cache.get(data.${config[x].dbname})`) || '`None`';
                            value =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
                            if (value.type !== 'GUILD_TEXT') {
                                message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.fail} Only guild text channels are allowed`)] });
                                return;
                            }
                            break;
                        }
                        case "role": {
                            oldValue = eval(`message.guild.roles.cache.get(data.${config[x].dbname})`) || '`None`';
                            value =  message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || '`None`';
                            break;
                        }
                    }
            
                    if (oldValue === value) {
                        message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.fail} ${config[x].title} is already ${oldValue}`)] });
                        return
                    }

                    return eval(`data.updateOne({ _id: message.guild.id, ${config[x].dbname}: value  })`).then(() => {
                    message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.success} ${config[x].title} has been changed from ${oldValue} to ${value}`)] });
                    });
                    
                } else {
                    x++;
                }
                //--------
            }
        })
	}
};
