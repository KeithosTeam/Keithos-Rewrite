const Client = require("../structures/Client");

module.exports = class Command {
    /**
     * @param {Client} client 
     */
    constructor(client, option = {
        name: "",
        description: "",
        aliases: [],
        cooldown: 0,
        owneronly: false,
        toggleCooldown: false
    }) {

        this.client = client;
        this.name = option.name;
        this.description = option.description || "";
        this.aliases = option.aliases || [];
        this.cooldown = option.cooldown || 5;
        this.owneronly = option.owneronly || false;
        this.toggleCooldown = option.toggleCooldown || false;
    };

    async run (message, args) {
        return;
    };
};
