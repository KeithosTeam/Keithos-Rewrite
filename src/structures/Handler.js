const Event = require("../core/Event");
const Client = require("./Client");

module.exports = class Handler {
    /**
     * The discord.js client
     * @param {Client} client 
     */
    constructor(client) {

        this.client = client;
        this.path = require("path");
        this.glob = require("glob");

    };
    /**
     * The path to the events folder
     * @param {string} loc 
     */
    loadEvents (loc) {

        const events = this.glob.sync(loc);

        for (const evt of events) {

            const event = new (require(this.path.resolve(evt)))(this.client);

            if (!event instanceof(Event)) {
                return;
            };

            this.client.on(event.name, (...args) => event.run(...args));
        };
    };
};
