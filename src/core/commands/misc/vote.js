const { MessageButton, MessageActionRow } = require("discord.js");
const Command = require("../../Command");


module.exports = class Vote extends Command {
    constructor(client) {
        super(client, {
            name: "vote",
            description: "Vote for keithos yes",
            aliases: [],
            cooldown: 10,
            toggleCooldown: true,
        });
    };

    async run(message, args) {

        const button1 = new MessageButton()
            .setStyle("LINK")
            .setLabel("Discord Boats")
            .setURL(this.client.config.links.dboats);

        const button2 = new MessageButton()
            .setStyle("LINK")
            .setLabel("DBL")
            .setURL(this.client.config.links.dbl);

        const row = new MessageActionRow()
            .addComponents(button1, button2);

        return message.channel.send({ content: `Vote for ${this.client.user.username}!`, components: [row]});
    };
};
