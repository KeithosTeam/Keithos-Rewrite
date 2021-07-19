const { Message, MessageEmbed } = require("discord.js");
const Schema = require("../../../models/config");
const Command = require("../../Command");

module.exports = class setprefix extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Displays the help dialog",
            aliases: ["?", "h"],
            example: ["help"]
        });
    };
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async run(message, args) {

        
    };
};
