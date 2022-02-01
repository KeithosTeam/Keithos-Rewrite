const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const cfg = require('./config_layout.json')
const none = '\`None\`';
//console.log(cfg.config[0].names)

module.exports = class config extends Command {
	constructor(client) {
		super(client, {
			name: 'testconfig',
			description: 'edit the settings',
			type: client.types.ADMIN,
			aliases: ['tcfg', 'tsettings'],
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
				data = new Schema({ _id: guild.id });
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
                        .setTimestamp(Date.now())
                    let z=0;
                    const len = config.length
                    console.log(args)
                    while(z < len){
                        console.log(`${z} <= ${len}`)
                        if (config[z].tab == args[0]){
                            let value = eval(`data.${config[z].dbname}`)
                            const type = config[z].type
                            console.log(type)
                            if ( type == "string" ) {
                                value = `\`${value}\``
                            } else
                            if ( type == "channel" ){
                                value = message.guild.channels.cache.get(value) || '`None`';
                            } else
                            if ( type == "role" ){
                                value = message.guild.roles.cache.get(value) || '`None`';
                            }

                            eval(`embed.addField(\`\${config[z].names[0]}\`, \`\${value}\`, true)` )
                        }
                        z++
                    }
                    return message.channel.send({embeds: [embed]})
                }

                if (config[x].tab == args[0] && config[x].names.includes(args[1])) {
                    console.log("A: " + config[x].names)

                    const Embed = new MessageEmbed()
                    .setTitle(config[x].title)
                    .setColor(this.client.config.embed.color)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    
                    let value;
                    let oldValue = eval(`data.${config[x].dbname}`);
                    console.log(oldValue)
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
                            this.utils.sendErrorMessage(message, this, 'The prefix cant be \`None\`', err.message);
                        }
                        return eval(`Schema.updateOne({ _id: message.guild.id, ${config[x].dbname}: undefined  }).then(() => {
                            message.channel.send({ embeds: [Embed.addField('Success!', '${this.emoji.success} ${config[x].title} has been changed from ${oldValue} to ${none}')] });
                        });`)
                        }

                    // if (config[x].type == 'string')
                    // {
                    //     oldValue = eval(`data.${config[x].dbname}`)
                    //     console.log("value " + oldValue)
                    //     value = args[2];
                    //     type = 'string'
                    // }
                    // else if (config[x].type == 'channel') 
                    // {
                    //     oldValue = eval(`message.guild.channels.cache.get(data.${config[x].dbname}) || '${none}';`)
                    //     value =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
                    //     type = 'channel';
                    // } 
                    // else if (config[x].type == 'role') 
                    // {
                    //     oldValue = eval(`message.guild.channels.cache.get(data.${config[x].dbname}) || '${none}';`)
                    //     value =  message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || '`None`';
                    //     type = 'role';
                    // }
        

                    
                        console.log('switch!')
                    switch(config[x].type){
                        case "string":{
                            oldValue = eval(`data.${config[x].dbname}`)
                            value = args[2];
                            break;
                        }
                        case "channel":{
                            oldValue = eval(`message.guild.channels.cache.get(data.${config[x].dbname}) || '${none}';`)
                            value =  message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || '`None`';
                            if (value.type !== 'GUILD_TEXT') {
                                message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.fail} Only guild text channels are allowed`)] });
                                return;
                            }
                            break;
                        }
                        case "role": {
                            oldValue = eval(`message.guild.channels.cache.get(data.${config[x].dbname}) || '${none}';`)
                            value =  message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || '`None`';
                            break;
                        }
                    }
            
                    if (oldValue === value) {
                        message.channel.send({ embeds: [Embed.addField('Error:', `${this.emoji.fail} ${config[x].title} is already ${oldValue}`)] });
                        return
                    }
        
                    return eval(`data.updateOne({ _id: message.guild.id, ${config[x].dbname}: value  })`).then(() => {
                        message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.success} ${config[x].title} has been changed from \`${oldValue}\` to \`${value}\``)] });
                    });

                    if(config[x].type ==="string"){
                        return eval(`data.updateOne({ _id: message.guild.id, ${config[x].dbname}: value  })`).then(() => {
                        message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.success} ${config[x].title} has been changed from \`${oldValue}\` to \`${value}\``)] });
                        });
                    } else {
                        return eval(`data.updateOne({ _id: message.guild.id, ${config[x].dbname}: value  })`).then(() => {
                        message.channel.send({ embeds: [Embed.addField('Success!', `${this.emoji.success} ${config[x].title} has been changed from ${oldValue} to ${value}`)] });
                        });
                    }
                } else {
                    x++;
                }
                //--------
            }
        })
	}
};
