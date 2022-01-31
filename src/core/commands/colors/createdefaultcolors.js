const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const colors = require('../../../utils/colors.json');
const len = Object.keys(colors).length;

module.exports = class creaatedefaultcolors extends Command {
	constructor(client) {
		super(client, {
			name: 'createdefaultcolors',
			description: 'asd',
            example: 'colors',
			cooldown: 5,
			toggleCooldown: false,
			clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
			userPermissions: ['MANAGE_ROLES'],
			type: client.types.COLOR 
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
            
	    const embed = new MessageEmbed()
	      .setTitle('Create Default Colors')
	      .setDescription('Creating colors...')
	      .setColor(message.guild.me.displayHexColor);
	    const msg = await message.channel.send({embeds: [embed]});

	    // Create default colors
	    let position = 1;
	    const colorList = [];
	    for (let [key, value] of Object.entries(colors)){
	      key = '#' + key;
	      if (!message.guild.roles.cache.find(r => r.name === key)) {
	        try {
	          const role = await message.guild.roles.create({
	              name: key,
	              color: value,
	              position: position,
	              permissions: []
	          });
	          colorList.push(role);
	          position++; // Increment position to create roles in order
	        } catch (err) {
	          this.client.logger.error(err.message);
	        }
	      } 
	    }
	    const fails = len - colorList.length;
	    embed // Build embed
	      .setThumbnail(message.guild.iconURL({ dynamic: true }))
	      .setDescription(`Created \`${len - fails}\` of  \`${len}\` default colors.`)
	      .addField('Colors Created', (colorList.length > 0) ? colorList.reverse().join(' ') : '`None`')
	      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
	      .setTimestamp()
	      .setColor(message.guild.me.displayHexColor);
	    msg.edit({embeds: [embed]});
        })
	}
};
