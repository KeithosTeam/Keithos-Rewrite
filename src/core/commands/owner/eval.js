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

        if (!code) {
            return message.channel.send({ content: this.emoji.cross + " Please give a code to run" });
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
                .setTitle("Eval")
                .setColor("AQUA")
                .addField("Input", `\`\`\`js\n${code}\`\`\``)
                .addField("Output", `\`\`\`\n${evaled || "Evaled"}\`\`\``)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }));


            message.channel.send({ embeds: [embed] });

        } catch (error) {

            const err = new MessageEmbed()
                .setTitle("Error")
                .setDescription(String.apply(error));

            message.channel.send({ embeds: [err] });
        };
    };
};
