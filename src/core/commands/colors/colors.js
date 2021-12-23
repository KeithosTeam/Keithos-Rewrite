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
       .sort((a, b) => b.position - a.position).array();

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

      let n = 0;
      const { getRange } = message.client.utils;
      embed
        .setTitle('Available Colors ' + getRange(colors, n, interval))
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expires after two minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`
          ${colors.slice(n, n + interval).join(' ')}\n\nType \`${prefix}color <color name>\` to choose one.
        `);

      const json = embed.toJSON();

      const previous = () => {
        if (n === 0) return;
        n -= interval;
        return new MessageEmbed(json)
          .setTitle('Available Colors ' + getRange(colors, n, interval))
          .setDescription(`
            ${colors.slice(n, n + interval).join(' ')}\n\nType \`${prefix}color <color name>\` to choose one.
          `);
      };

      const next = () => {
        const cap = colors.length - (colors.length % interval);
        if (n === cap || n + interval === colors.length) return;
        n += interval;
        if (n >= colors.length) n = cap;
        const max = (colors.length > n + interval) ? n + interval : colors.length;
        return new MessageEmbed(json)
          .setTitle('Available Colors ' + getRange(colors, n, interval))
          .setDescription(`${colors.slice(n, max).join(' ')}\n\nType \`${prefix}color <color name>\` to choose one.`);
      };

      const reactions = {
        '◀️': previous,
        '▶️': next,
        '⏹️': null,
      };

      const menu = new ReactionMenu(message.client, message.channel, message.member, embed, null, null, reactions);
      
      menu.reactions['⏹️'] = menu.stop.bind(menu);
    }

        })
	}
};
