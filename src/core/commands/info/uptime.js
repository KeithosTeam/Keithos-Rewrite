const { MessageEmbed } = require("discord.js");
const Command = require("../../Command");
const moment = require("moment");
require("moment-duration-format");

module.exports = class ping extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            description: "Total uptime of Keithos",
            aliases: ["up"],
            cooldown: 5,
            type: client.types.UTILITY,
            toggleCooldown: true
        });
    };

    async run(message) {

        const uptime = new MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setTitle("Uptime")
            .setDescription(`\`\`\`${moment.duration(this.client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}\`\`\``)
            .setColor("ORANGE")
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }));

        return message.channel.send({ embeds: [uptime] });

    };
};