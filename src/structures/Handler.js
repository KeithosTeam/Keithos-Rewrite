const Event = require("../core/Event");
const Command = require("../core/Command");
const Client = require("./Client");
const AsciiTable = require('ascii-table');

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
        

        this.client.logger.info('Loading commands...');
        let table = new AsciiTable('Commands');
        for (const cmd of commands) {

            const command = new (require(this.path.resolve(cmd)))(this.client);
            table.setHeading('Name', 'Aliases', 'Type', 'Status');

            if (command.name && !command.disabled) {

            if (!command instanceof(Command) || !command.name) {
                return;
            };

            this.client.commands.set(command.name, command);

            if (command.aliases && Array.isArray(command.aliases)) {

                command.aliases.forEach(alias => this.client.aliases.set(alias, command));

            };

            table.addRow(command.name, command.aliases, command.type, 'pass');
            // this.client.logger.info(`Loading command: ${command.name}`);
            // this.client.logger.info(`Alias: ${command.aliases}`);
            } else {
            this.client.logger.warn(`${command.name} failed to load`);
            table.addRow(command.name, '', '', 'fail');
            return;
            }
        };
        this.client.logger.info(`\n${table.toString()}`);
    };

    /**
     * The path to the events folder
     * @param {string} loc 
     */
    loadEvents (loc) {

        const events = this.glob.sync(loc);
        this.client.logger.info(`${events.length} event(s) found...`);
        for (const evt of events) {

            const event = new (require(this.path.resolve(evt)))(this.client);

            if (!event instanceof(Event)) {
                return;
            };
            
            this.client.logger.info(`Loading event: ${event.name}`);
            if (events.length == 0) return this.logger.warn('No events found');
            
            if (event.once) {
                this.client.once(event.name, (...args) => event.run(...args));
            } else {
                this.client.on(event.name, (...args) => event.run(...args));
            };
        };
    };
};
