const { GuildMember, MessageEmbed } = require("discord.js");
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

            if (!data || !data.joinLog) {
                return;
            };

            const channel = this.client.channels.cache.get(String(data.joinLog));
            if (channel && channel.type === "GUILD_TEXT") {
                return channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle('Joined Guild')
                        .setColor('GREEN')
                        .setThumbnail(`${member.user.defaultAvatarURL({ dynamic: true })}`)
                        .addField('Name & ID', `${member.user.username} (${member.user.id})`)
                        .setTimestamp(Date.now())
                    ]
                }).catch(err => { 
                    return;
                });
            };
        });
    };
};