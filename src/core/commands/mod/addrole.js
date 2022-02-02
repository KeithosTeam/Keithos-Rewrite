const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'addrole',
			description: 'gives a role to a user',
            example: 'addrole @MCorange @member',
			cooldown: 5,
			toggleCooldown: false,
            clientPemissions: [],
            userPermissions: [],
			type: client.types.MOD //can be UTILITY, MINECRAFT, FUN, COLOR, INFO, POINTS, MISC, MOD, ADMIN, OWNER,
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        Schema.findOne({ _id: message.guild.id }, async (e, data) => {
               const member = this.utils.getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
			    if (!member)
			      return this.utils.sendErrorMessage(message, this, 'Please mention a user or provide a valid user ID');
			    if (member.roles.highest.position >= message.member.roles.highest.position)
			      return this.utils.sendErrorMessage(message, this, 'You cannot add a role to someone with an equal or higher role');

			    const role = this.getRoleFromMention(message, args[1]) || message.guild.roles.cache.get(args[1]);
			    
			    let reason = args.slice(2).join(' ');
			    if (!reason) reason = '`None`';
			    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
			    his.utils.sendModLogMessage(message, reason, { Member: member, Role: role });
			    if (!role)
			      return this.utils.sendErrorMessage(message, this, 'Please mention a role or provide a valid role ID');
			    else if (member.roles.cache.has(role.id)) // If member already has role
			      return this.utils.sendErrorMessage(message, this, 'User already has the provided role');
			    else {
			      try {

			        // Add role
			        await member.roles.add(role);
			        const embed = new MessageEmbed()
			          .setTitle('Add Role')
			          .setDescription(`${role} was successfully added to ${member}.`)
			          .addField('Moderator', message.member, true)
			          .addField('Member', member, true)
			          .addField('Role', role, true)
			          .addField('Reason', reason)
			          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
			          .setTimestamp()
			          .setColor(message.guild.me.displayHexColor);
			        message.channel.send({embeds: [embed]});

			        // Update mod log
			        this.utils.sendModLogMessage(message, reason, { Member: member, Role: role });

			      } catch (err) {
			        message.client.logger.error(err.stack);
			        return this.utils.sendErrorMessage(message, this, 'Please check the role hierarchy', err.message);
			      }
    			}  
        })
	}
};
