const Event = require("../core/Event");
const Command = require("../core/Command");
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
    loadCommands (loc) {

        const commands = this.glob.sync(loc);

        for (const cmd of commands) {

            const command = new (require(this.path.resolve(cmd)))(this.client);

            if (!command instanceof(Command) || !command.name) {
                return;
            };

            this.client.commands.set(command.name, command);

            if (command.aliases && Array.isArray(command.aliases)) {

                command.aliases.forEach(alias => this.client.aliases.set(alias, command));

            };
        };
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
            
            if (event.once) {
                this.client.once(event.name, (...args) => event.run(...args));
            } else {
                this.client.on(event.name, (...args) => event.run(...args));
            };
        };
    };
};
