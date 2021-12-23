const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');

module.exports = class ban extends Command {
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
          .addField('Moderator', message.member.toString(), true)
          .addField('Member', user.tag, true)
          .addField('Reason', reason )
          .setColor(this.client.config.embed.color)
          .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();

          message.channel.send({ embeds: [embed] })

          Schema.findOne({ _id: message.guild.id }, async (e, data) => {
            const modLogId = data.modLog
            const modLog = message.guild.channels.cache.get(modLogId); 
            if (
              modLog &&
              modLog.viewable &&
              modLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
            ) {
              const embed = new MessageEmbed()
                .setTitle(`Action: \`BAN\``)
                .addField('Moderator', message.member.toString(), true)
                .addField('Reason', reason)
                .setTimestamp()
                .setThumbnail(message.member.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                .setColor(message.guild.me.displayHexColor);

              modLog.send({ embeds: [embed]})
            }
        })
    
	}
};
