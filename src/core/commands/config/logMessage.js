const { Message } = require("discord.js");
const Schema = require("../../../models/config");
const Command = require("../../Command");

module.exports = class logMessage extends Command {
    constructor(client) {
        super(client, {
            name: "setmessagelog",
            description: "Set the message log channel",
            aliases: ["sml"],
            cooldown: 8,
            example: "setmessagelog <#channel>",
            toggleCooldown: false,
            userPermissions: ["MANAGE_GUILD"]
        });
    };
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run (message, args) {


        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!channel) {
            return message.channel.send({ content: "You have to mention a channel."});
        };

        if (channel.type !== "GUILD_TEXT") {
            return message.channel.send({ content: "Guild text channel is only allowed"})
        };

        Schema.findOne({ _id: message.guild.id }, async (e, data) => {

            if (!data) {
                data = new Schema({ _id: message.guild.id, messageLog: channel.id});
            } else {
                return data.updateOne({ _id: message.guild.id, messageLog: channel.id });
            };

            data.save();
        });

        message.channel.send({ content: this.emoji.tick + ` ${channel} is set as message log`});
    };
};
