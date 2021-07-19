const { MessageEmbed, Guild } = require("discord.js");
const Schema = require("../../../models/config");
const Event = require("../../Event");

module.exports = class GuildDelete extends Event {
    constructor(client) {
        super(client, {
            name: "guildDelete"
        });
    };
    /**
     * 
     * @param {Guild} guild 
     */
    async run(guild) {

        Schema.findOne({ _id: guild.id }, async (e, data) => {

            if (!data) {
                return;
            } else {
                return data.delete()
            };
        });

        const embed = new MessageEmbed()
            .setTitle("Left Guild")
            .setColor("DARK_RED")
            .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
            .addField("Name & ID", `${guild.name} (${guild.id})`)
            .addField("Owner", `<@${guild.ownerId}>`)
            .addField("Members", `${guild.memberCount}`)
            .setTimestamp(Date.now());


        //this.client.channels.cache.get(this.client.config.log.guild).send({ embeds: [embed]}).catch(e => { return });
        //this.client.channels.cache.get("866672081294590032").send({ embeds: [embed]})


    };
};
