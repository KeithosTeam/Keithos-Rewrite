const { Message, MessageEmbed } = require("discord.js");
const Schema = require("../../../models/config");
const Command = require("../../Command");

module.exports = class setprefix extends Command {
    constructor(client) {
        super(client, {
            name: "setprefix",
            description: "Display the current prefix or change it",
            aliases: ["spref"],
            userPermissions: ["MANAGE_GUILD"],
            example: ["prefix !"],
            cooldown: 10,
            toggleCooldown: true
        });
    };
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run(message, args) {

        let prefix = args[0];

        const oldPrefix = schema.prefix
        const schema = await Schema.findOne({ _id: message.guild.id });

        const prefixEmbed = new MessageEmbed()
            .setTitle("Prefix")
            .setDescription(`The current prefix of this guild is \`${schema.prefix}\`\nTo change \`${schema.prefix}prefix <new>\``)
            .setColor(this.client.config.embed.color)
            .setFooter(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))

        if (!prefix) {
            return message.channel.send({
                embeds: [prefixEmbed]
            });
        };

        if (prefix.length > 4) {
            return message.channel.send(this.emoji.cross + " Prefix cannot be more than `4` chars");
        };

        if (schema.prefix === prefix) {
            return message.channel.send(this.emoji.cross + ` Prefix is already \`${schema.prefix}\``);
        };

        return schema.updateOne({ _id: message.guild.id, prefix: prefix }).then(() => {
            message.channel.send(this.emoji.tick + ` Prefix has been changed from \`${oldPrefix}\` to \`${prefix}\``);
        });
    };
};
