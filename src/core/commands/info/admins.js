const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class admins extends Command {
	constructor(client) {
		super(client, {
		    name: 'admins',
		    usage: 'admins',
		    description: 'Displays a list of all current admins.',
		    type: client.types.INFO,
		    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'] 
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
               // Get admin role
		    const adminRoleId = data.modRole
		    const adminRole = message.guild.roles.cache.get(adminRoleId) || '`None`';
		    console.log(ad)
		    const admins = message.guild.members.cache.filter(m => {
		      if (m.roles.cache.find(r => r === adminRole)) return true;
		    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1);;

		    const embed = new MessageEmbed()
		      .setTitle(`Admin List [${admins.length}]`)
		      .setThumbnail(message.guild.iconURL({ dynamic: true }))
		      .addField('Admin Role', adminRole)
		      .addField('Admin Count', `**${admins.length}** out of **${message.guild.members.cache.size}** members`)
		      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
		      .setTimestamp()
		      .setColor(message.guild.me.displayHexColor);

		    const interval = 24;
		    if (admins.length === 0) message.channel.send({embeds: [embed.setDescription('No admins found.')] });
		    else if (admins.length <= interval) {
		      const range = (admins.length == 1) ? '[1]' : `[1 - ${admins.length}]`;
		      let desc, toggle, count=0;
		            admins.forEach((value, key) => {
			          if (!toggle && !value > interval) {
			            desc = `${admins.get(key)}\n`
			            toggle = true;
			            count++
			          } else if(toggle && !value > interval){
			            desc = desc + `${admins.get(key)}\n`
			            count++
			          } if (toggle && value > interval){
			          	desc = desc + "..."
			          }
		        	});

		    	message.channel.send({embeds: [embed
		    		.setTitle(`Admin List ${range}`)
		        	.setDescription(desc)
		        ]})
		    }

        })
	}
};
