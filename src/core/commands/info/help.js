const { Message, MessageEmbed } = require("discord.js");
const schema = require("../../../models/config");
const Command = require("../../Command");
const { oneLine, stripIndent } = require('common-tags');
const emojis = require('../../../utils/emoji.json');

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
