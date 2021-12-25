const { Client: Discord, Collection, Message } = require("discord.js");
const logger = require("../utils/logger.js");
const Database = require("./Database");
const Handler = require("./Handler");

const TypeConfig = {
  token: "",
  prefix: "",
  owners: [],
  database: {
    mongoURL: "",
  },
};

module.exports = class Client extends Discord {
  constructor() {
    super({
      intents: [
        "GUILDS",
        'GUILD_VOICE_STATES',
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
      ],
      allowedMentions: {
        parse: ["everyone"],
      },
    });

    /**
     * Create logger
     */
    this.logger = require("../utils/logger.js");

    /**
     * All possible command types
     * @type {Object}
     */
    this.types = {
      UTILITY: "utility",
      MINECRAFT: "minecraft",
      FUN: "fun",
      COLOR: "color",
      INFO: "info",
      POINTS: "points",
      MISC: "misc",
      MOD: "mod",
      ADMIN: "admin",
      OWNER: "owner",
      MUSIC: "music"
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
     * Package.json
     */
    this.pkg = require("../../package.json");

    /**
     * Handler
     */
    this.handler = new Handler(this);

    /**
     * Database
     */
    this.db = new Database(this.config.database.mongoURL);

    this.logger.info("Loading Client.js");
  }

  login(token) {
    if (!token || typeof token !== "string") {
      this.logger.error("Token is missing");
    }

    super.login(token).catch((err) => {
      this.logger.error(err);
    });

    this.db.connect(true);

    this.handler.loadEvents(this.config.handler.events);
    this.handler.loadCommands(this.config.handler.commands);
    //const api = require('../core/api/api')
    if(this.config.api.enabled == true) { this.handler.loadApi("../core/api/api", this) } else { this.logger.warn('API is disabled. This might be an intended change but also could be a bug.') }
    this.logger.info("Database connected");

  
  }
};
