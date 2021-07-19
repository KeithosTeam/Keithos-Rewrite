const Client = require("../structures/Client");

module.exports = class Command {
    /**
     * @param {Client} client 
     */
    constructor(client, option = {
        name: "",
        description: "",
        aliases: [],
        example: "",
        cooldown: 0,
        ownerOnly: false,
        toggleCooldown: false,
        clientPermissions: [],
        userPermissions: []
    }) {

        this.client = client;
        this.name = option.name;
        this.description = option.description || "";
        this.aliases = option.aliases || [];
        this.example = option.example || "";
        this.cooldown = option.cooldown || 5;
        this.emoji = require("../utils/emoji.json");
        this.ownerOnly = option.ownerOnly || false;
        this.toggleCooldown = option.toggleCooldown || false;
        this.clientPermissions = option.clientPermissions || [];
        this.userPermissions = option.userPermissions || [];
    };

    async run (message, args) {
        return;
    };
};
