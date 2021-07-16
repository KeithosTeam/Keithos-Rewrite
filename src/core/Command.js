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
        devOnly: false,
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
        this.devOnly = option.devOnly || false;
        this.toggleCooldown = option.toggleCooldown || false;
        this.clientPermissions = option.clientPermissions || [];
        this.userPermissions = option.userPermissions || [];
    };

    async run (message, args) {
        return;
    };
};
