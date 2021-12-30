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

        console.log('very start')

        let tmp = args.join('~').toLowerCase()
            args = tmp.split('~')

        let config = cfg.config

        Schema.findOne({ _id: message.guild.id }, async (e, data) => {

            console.log('past mongodb')

            if (!data) {
				data = new Schema({ _id: guild.id });
				data.save();
            }
            console.log('past data check')
            let x = 0;
            while (x + 1 <= config.length){
                console.log(x)
                console.log(config[x].names)
                console.log(args)
                if (args[1].includes(config[x].names)) {
                    console.log("A: " + config[x].names)

                    const Embed = new MessageEmbed()
                    .setTitle(config[x].title)
                    .setColor(this.client.config.embed.color)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    
                    let value;
                    let oldValue;
                    let type;

                    if (!args[2]) {
                        return message.channel.send({ embeds: [Embed.addField('Hey!', `The ${config[x].title} for this guild is ${oldValue}`)] });
                        
                    }
        
                    if (args[2] == 'none'){
                        return eval(`data.updateOne({ _id: message.guild.id, ${config[x].dbname}: undefined  }).then(() => {
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
                } else {
                    x++;
                }
                //--------
            }
        })
	}
};
