const { Message, MessageActionRow, MessageButton } = require("discord.js");
const Command = require("../../Command");

module.exports = class invite extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            description: "Invite our bot to the server.",
            aliases: ["inv"],
            type: client.types.UTILITY,
            cooldown: 5,
            toggleCooldown: true
        });
    };
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run(message, args) {

        const invite = new MessageButton()
            .setStyle("LINK")
            .setURL(this.client.config.links.invite)
            .setLabel("Click Here")
            .setEmoji("❤️");


        const row = new MessageActionRow()
            .addComponents(invite)

        return message.channel.send({ content: `Invite ${this.client.user.username} to your discord server :)`, components: [row] });
    };
};