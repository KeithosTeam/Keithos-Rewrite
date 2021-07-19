const Event = require("../../Event");
const Schema = require("../../../models/config");
const { Guild, MessageEmbed } = require("discord.js");

module.exports = class guildCreate extends Event {
    constructor(client) {
        super(client, {
            name: "guildCreate"
        });
    };

    /**
     * @param {Guild} guild 
     */
    async run(guild) {

        Schema.findOne({ _id: guild.id }, async (err, data) => {

            if (data) {
                return;
            } else {
                data = new Schema({ _id: guild.id });
                data.save();
            };
        });

        const embed = new MessageEmbed()
            .setTitle("Joined Guild")
            .setColor("GREEN")
            .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
            .addField("Name & ID", `${guild.name} (${guild.id})`)
            .addField("Owner", `<@${guild.ownerId}>`)
            .addField("Members", `${guild.memberCount}`)
            .setTimestamp(Date.now());

        const channel = this.client.channels.cache.get(this.client.config.log.guild);

        if (channel) {
            channel.send({ embeds: [embed] }).catch(e => { return });
        };
    };
};
