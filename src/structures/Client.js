const { Client: Discord, Collection, Message } = require("discord.js");
const Handler = require("./Handler");

const TypeConfig = {
    token: "",
    prefix: "",
    owners: [],
    database: {
        mongoURL: ""
    }
};

module.exports = class Client extends Discord {
    constructor() {
        super({
            intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
            allowedMentions: {
                parse: ["everyone"]
            }
        });

        /**
         * Commands
         * @type {Map}
         */
        this.commands = new Collection();

        /**
         * Aliases
         * @type {Map}
         */
        this.aliases = new Collection();

        /**
         * Config
         */
        this.config = require("../../config.json"); 

        /**
         * Handler
         */
        this.handler = new Handler(this);
    };

    login (token) {

        if (!token || typeof(token) !== "string") {
            throw new TypeError("Token is missing");
        };

        super.login(token).catch(err => {
            throw err;
        });

        this.handler.loadEvents(this.config.handler.events);
    };
};
