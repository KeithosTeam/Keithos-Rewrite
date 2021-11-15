const { MessageEmbed, GuildMember } = require("discord.js");
const Schema = require("../../../models/config");
const Event = require("../../Event");

module.exports = class guildMemberAdd extends Event {
    constructor(client,) {
        super(client, {
            name: "guildMemberAdd"
        });
    };
    /**
     * 
     * @param {GuildMember} guildMember 
     */
    async run(guildMember) {
        console.log('user joined\n' + guildMember.user.id + '\n' + guildMember.user.name)

        try {
            resolveData(guildMember.guildId);
        } catch (err) {
            return;
        };

        this.client.logger.warn(`${guildMember.user.tag}(${guildMember.user.id}) has joined ${guildMember.guild.name}`);

        const embed = new MessageEmbed()
            .setTitle('Joined Guild')
            .setColor('GREEN')
            .setThumbnail(`${guildMember.user.avatarURL({ dynamic: true })}`)
            .addField('Name & ID', `${guildMember.user.username} (${guildMember.user.id})`)
            .setTimestamp(Date.now());

        Schema.findOne({ _id: guildMember.guildId }, async (e, data) => {
            if (!data || !data.joinLog) {
                return;
            } else {
                const channel = this.client.channels.cache.get(data.joinLog)
                
                if (channel) {
                    channel.send({
                        embeds: [embed]
                    }).catch(err => {
                        return;
                    });
                };
            };
        });
    };
};

function resolveData(guildId) {
    Schema.findOne({ _id: guildId }, async (err, data) => {

        if (data) {
            return;
        } else {
            data = new Schema({ _id: guildId });
            data.save();
        };
    });
};