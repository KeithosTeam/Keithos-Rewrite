const { Message, Collection } = require("discord.js");
const Event = require("../../Event");


module.exports = class msage extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        });
    };
    /**
     * @param {Message} message 
     */
    async run(message) {

        if (!message.guild.me.permissions.has("SEND_MESSAGES")) {
            return;
        };

        if (message.author.bot) {
            return;
        };

        if (message.channel.type !== "GUILD_TEXT") {
            return;
        };

        if (!message.content.startsWith(this.client.config.prefix)) {
            return;
        };

        const args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase();

        let command = this.client.commands.get(cmd);

        if (!command) command = this.client.aliases.get(cmd);

        if (command) {

            if (command.devOnly === true) {

                if (message.author.id.includes(this.client.config.owners)) {
                    return;
                };

            };

            if (command.toggleCooldown) {

                if (!this.client.cooldowns.has(command.name)) {
                    this.client.cooldowns.set(command.name, new Collection());
                };

                const time = this.client.cooldowns.get(command.name);
                const amount = (command.cooldown || 5) * 1000;

                if (time.has(message.author.id)) {

                    const expire = time.get(message.author.id) + amount;

                    if (Date.now() < expire) {
                        const left = (expire - Date.now()) / 1000;

                        return message.channel.send({ content: `The command is on cooldown for \`${left.toFixed(1)}\` seconds`});
                    };
                };

                time.set(message.author.id, Date.now());
                setTimeout(() => time.delete(message.author.id), amount);

            };

            if (command.userPermissions.length) {

                const array = [];

                try {

                for (const i of command.userPermissions) {
                    
                    if (!message.member.permissions.has(i)) {
                        array.push(i);
                    };
                };

            } catch (err) { return; }

                if (array.length) {
                    return message.channel.send({ content: `You don't have permissions:- ${array.join(" , ")}`})
                };
            };

            if (command.clientPermissions.length) {

                const array = [];

                try {

                for (const i of command.clientPermissions) {
                    
                    if (!message.guild.me.permissions.has(i)) {
                        array.push(i);
                    };
                };

            } catch (err) { return; }

                if (array.length) {
                    return message.channel.send({ content: `I don't have permissions:- ${array.join(" , ")}`})
                };
            };

            command.run(message, args);
        };
    };
};
