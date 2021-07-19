const { Message, MessageEmbed } = require("discord.js");
const Command = require("../../Command");


module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Literally run a whole code using this command",
            aliases: ["coderun"],
            example: "eval <code>",
            ownerOnly: true
        });
    };
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run(message, args) {

        const code = args.join(" ");

        const error = new MessageEmbed()
            .setTitle(`${this.emoji.cross} Error:`)
            .setColor("AQUA")
            .setDescription("Please provide code to run")
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        if (!code) {
            return message.channel.send({ embeds: [error] });
        };
        try {

            let evaled = eval(code);

            if (code.toLowerCase().includes("process.exit()") || code.toLowerCase().includes("this.client.token") || code.toLowerCase().includes("this.config") || code.toLowerCase().includes("message.client.token")) {
                evaled = "No token for you";
            } else {
                evaled = eval(code);
            };

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled, { depth: 0 });
            };

            let embed = new MessageEmbed()
                .setTitle(`${this.emoji.tick}Eval`)
                .setColor("AQUA")
                .addField("Input", `\`\`\`js\n${code}\`\`\``)
                .addField("Output", `\`\`\`\n${evaled || "Evaled"}\`\`\``)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();


            message.channel.send({ embeds: [embed] });

        } catch (error) {

            const err = new MessageEmbed()
                .setTitle(`${this.emoji.cross}Error:`)
                .setDescription(String.apply(error))
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send({ embeds: [err] });
        };
    };
};
