const { MessageEmbed } = require("discord.js");
const Command = require("../../Command");

module.exports = class ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Ping of Keithos",
            aliases: ["pong"],
            cooldown: 5,
            type: client.types.UTILITY,
            toggleCooldown: true
        });
    };

    async run (message, args) {

        const embed = new MessageEmbed()
            .setTitle("Pong! 🏓")
            .setColor("GREY")
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField("Message Latency", `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``)
            .addField("Keithos Latency", `\`\`\`${this.client.ws.ping}ms\`\`\``)
            .setFooter(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true}))

        return message.channel.send({ embeds: [embed]});
    };
};
