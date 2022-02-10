const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class colors extends Command {
	constructor(client) {
		super(client, {
			name: 'colors',
			description: 'asd',
      example: 'colors',
			cooldown: 5,
			toggleCooldown: false,
			type: client.types.COLOR,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS']
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
  Schema.findOne({ _id: message.guild.id }, async (e, data) => {
   
     const colors = message.guild.roles.cache.filter(c => c.name.startsWith('#'))
       .sort((a, b) => b.position - a.position)//.array();
       //console.log(colors)
    // console.log(message.guild.roles.cache.filter(c => c.name.startsWith('#')))
    
    const embed = new MessageEmbed()
      .setTitle(`Available Colors [${colors.size}]`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    const prefix = data.prefix

    const interval = 50;
    if (colors.length === 0){message.channel.send({ embeds: [embed.setDescription('No colors found.')] });}
    else if (colors.length <= interval) {
      const range = (colors.length == 1) ? '[1]' : `[1 - ${colors.length}]`;
	  embed
        .setTitle(`Available Colors ${range}`)
        .setDescription(`${colors.join(' ')}\n\nType \`${prefix}color <color name>\` to choose one.`)
      message.channel.send({ embeds: [embed]});
      
    // Reaction Menu
    } else {
      let desc, toggle;
      const range = (colors.length == 1) ? '[1]' : `[1 - ${colors.length}]`;
      embed.setTitle(`Available Colors ${range}`)
        colors.forEach((value, key) => {
          if (!toggle) {
            desc = `${colors.get(key)}  `
            toggle = true;
          } else {
            desc = desc + `${colors.get(key)}  `
          }
        });
      embed
        .setDescription(`${desc}\n\nType \`${prefix}color <color name>\` to choose one.`)
      message.channel.send({ embeds: [embed]});
    }

        })
	}
};
