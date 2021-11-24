const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
//Not rl done so help pls
module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			description: 'Purges messages, No more than 100 messages may be deleted at a time. \nMessages older than 2 weeks old cannot be deleted.',
			cooldown: 5,
			toggleCooldown: true,
            example: "purge @mcorange #general 69",
            type: client.types.MOD
		});
	}
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {

		let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
    console.log(args)
        if (channel) {
            args.shift();
          } else channel = message.channel;
    console.log(args)
        if (channel.type != 'GUILD_TEXT'){
            this.utils.sendErrorMessage(message, this, 'Please mention an accessible text channel or provide a valid text channel ID')
            return
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (member){
            args.shift();
        }

        console.log(args)
        const amount = parseInt(args[0]);
        if (isNaN(amount) === true || !amount || amount < 0 || amount > 100) {
            this.utils.sendErrorMessage(message, this, 'Please provide a message count between 1 and 100');
        }
        
        if (!channel.permissionsFor(message.guild.me).has(['MANAGE_MESSAGES']))
        return this.utils.sendErrorMessage(message, this, 'I do not have permission to manage messages in the provided channel');
        

        let reason = args.slice(1).join(' ');
        if (!reason) reason = '`None`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
        console.log(reason)

        if (!channel.viewable) return;

        await message.delete()

        let messages;
        if (member) {
          messages = (await message.channel.messages.fetch({ limit: amount })).filter(m => m.memberId === member.id);
        } else messages = amount;

        console.log(amount)

        if (messages.size === 0){
            const errMsg = new MessageEmbed()
			.setTitle(`Purge`)
            .addField(`Deleted`, `${amount} messages`)
            .setDescription(`Unable to find any messages from ${member}. \nThis message will self destruct in \`10 seconds\`.`)
            .addField('Member', member )
            .addField('Channel', channel, true)
            .addField('Messages found', `\`${messages.size}\``, true)
            .setColor(this.client.config.embed.color)
			.setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();


		return message.channel.send({ embeds: [errMsg] }).catch(err => this.client.logger.error(err.stack));;
        } else {
        
        channel.bulkDelete(messages, true).then(messages => {
        	const embed = new MessageEmbed()
			.setTitle(`Purge`)
            .addField(`Channel`, channel, true)
            .addField(`Deleted`, `${amount} messages`)
            .addField('Reason', reason)
			.setColor(this.client.config.embed.color)
			.setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
			.setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
            if (member) {
                embed
                  .spliceFields(1, 1, { name: 'Found Messages', value:  `\`${messages.size}\``, inline: true})
                  .spliceFields(1, 0, { name: 'Member', value: member, inline: true});
              }

		return message.channel.send({ embeds: [embed] }).then(setTimeout(message => message.delete(), 10000))
        .catch(err => this.client.logger.error(err.stack));    
        })

        }
	}
};
