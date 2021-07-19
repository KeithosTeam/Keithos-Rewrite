const { Client: Discord, Collection, Message } = require("discord.js");
const Database = require("./Database");
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
     * All possible command types
     * @type {Object}
     */
    this.types = {
        UTILITY: 'utility',
        FUN: 'fun',
        COLOR: 'color',
        POINTS: 'points',
        MISC: 'misc',
        MOD: 'mod',
        ADMIN: 'admin',
        OWNER: 'owner'
      };

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
        * Cooldown
        * @type {Map}
        */
        this.cooldowns = new Collection();

        /**
         * Config
         */
        this.config = require("../../config.json");

        /**
         * Handler
         */
        this.handler = new Handler(this);

        /**
         * Database
         */
        this.db = new Database(this.config.database.mongoURL);

    };

    login(token) {

        if (!token || typeof (token) !== "string") {
            throw new TypeError("Token is missing");
        };

        super.login(token).catch(err => {
            throw err;
        });

        this.db.connect(true);

        this.handler.loadCommands(this.config.handler.commands);
        this.handler.loadEvents(this.config.handler.events);
    };
};
