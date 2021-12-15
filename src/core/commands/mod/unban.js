const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config')

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = class credit extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			description: 'Unbans the specified user',
			cooldown: 8, 
			toggleCooldown: false,
			type: client.types.MOD
		});
	}

	async run (message, args) {
        //console.log(await message.guild.bans.fetch())
        const id = args[0]
        if (!args[0]) return this.utils.sendErrorMessage(message, this, 'Unable to find user, please check the provided ID');
        if (!rgx.test(id)) return this.utils.sendErrorMessage(message, this, 'Please provide a valid user ID')
        const bannedUsers = await message.guild.bans.fetch();
        if (bannedUsers == undefined) return console.log('no banned users') || ''
        const user = bannedUsers.get(id).user //.catch(err = (err) => {console.log(err)})
        //console.log(bannedUsers.get(id).user)
        //console.log(user)
        if (!user) return this.utils.sendErrorMessage(message, this, 'Unable to find user, please check the provided ID');
        
          let reason = args.slice(1).join(' ');
          if (!reason) reason = '`None`';
          if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

         await message.guild.members.unban(user, reason);
          const embed = new MessageEmbed()
          .setTitle(`Unban`)
          .addField('Moderator', message.member.toString(), true)
          .addField('Member', user.tag, true)
          .addField('Reason', reason)
          .setColor(this.client.config.embed.color)
          .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();

          message.channel.send({ embeds: [embed] })

          Schema.findOne({ _id: message.guild.id }, async (e, data) => {
            const modLogId = data.modLog
            const modLog = message.guild.channels.cache.get(modLogId); 
            console.log(modLogId)
            if (
              modLog &&
              modLog.viewable &&
              modLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
            ) {
                console.log('passed')
              const modlog = new MessageEmbed()
                .setTitle(`Action: \`UNBAN\``)
                .addField('Moderator', message.member.toString(), true)
                .addField('Reason', reason)
                .setTimestamp()
                .setThumbnail(message.member.displayAvatarURL())
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                .setColor(message.guild.me.displayHexColor);

              modLog.send({ embeds: [modlog]})
            }
        })
    
	}
};
