const { GuildMember, MessageEmbed, Message } = require("discord.js");
const Event = require("../../Event");
const Schema = require("../../../models/config.js"); 

module.exports = class guildMember extends Event { 
    constructor (client) {
        super(client, {
            name: "guildMemberAdd"
        });
    };
    /**
     * @param {GuildMember} member
     */
    run (member) {
        
        Schema.findOne({ _id: member.guild.id }, async (err, data) => {
            if (!data || !data.joinLog || !data.welcomeLog) {
                return;
            };

            const channel = this.client.channels.cache.get(String(data.joinLog));
            if (channel && channel.type === "GUILD_TEXT") {
                channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle('Joined Guild')
                        .setColor('GREEN')
                        .setThumbnail(`${member.user.avatarURL({ dynamic: true })}`)
                        .addField('Name & ID', `${member.user.username} (${member.user.id})`)
                        .setTimestamp(Date.now())
                    ]
                }).catch(err => { 
                    return;
                });
            };
            // join msg
            const channel1 = this.client.channels.cache.get(String(data.welcomeLog));
            const msgDirty = data.welcomeMsg
            const msg = msgDirty
                        .replace(/`?\$member`?/g, member)
                        .replace(/`?\$tag`?/g, member.user.tag)
                        .replace(/`?\$user`?/g, `<@!${member.user.id}>`)
                        .replace(/`?\$nickname`?/g, member.user.nickname)
                        .replace(/`?\$size`?/g, member.guild.memberCount)

            channel1.send({
                embeds: [
                    new MessageEmbed()
                    .setDescription(msg)
                    .setTimestamp(Date.now())
                    .setColor('GREEN')
                    .setFooter(member.displayName, member.user.avatarURL({ dynamic: true }))
                    //.setThumbnail(`${member.user.avatarURL({ dynamic: true })}`)
                ]
            });
            return



        });

    };
};