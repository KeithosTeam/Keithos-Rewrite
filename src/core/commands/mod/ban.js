const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');

module.exports = class credit extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			description: 'Bans the specified user',
			cooldown: 8, 
			toggleCooldown: false,
			type: client.types.MOD
		});
	}

	async run (message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member)
          return this.utils.sendErrorMessage(message, this, 'Please mention a user or provide a valid user ID');
        if (member === message.member)
          return this.utils.sendErrorMessage(message, this, 'You cannot ban yourself'); 
        if (member.roles.highest.position >= message.member.roles.highest.position)
          return this.utils.sendErrorMessage(message, this, 'You cannot ban someone with an equal or higher role');
        if (!member.bannable)
          return this.utils.sendErrorMessage(message, this, 'Provided member is not bannable');

          let reason = args.slice(1).join(' ');
          if (!reason) reason = '`None`';
          if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

          await member.ban({ reason: reason });

          const embed = new MessageEmbed()
          .setTitle(`Ban`)
          .addField('Moderator', message.member, true)
          .addField('Member', member, true)
          .addField('Reason', reason)
          .setColor(this.client.config.embed.color)
          .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();

          message.channel.send({ embeds: [embed] })
    
	}
};
