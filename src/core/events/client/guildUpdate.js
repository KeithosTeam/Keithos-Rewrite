const { GuildMember, MessageEmbed } = require("discord.js");
const Event = require("../../Event");
const Schema = require("../../../models/config.js"); 

module.exports = class guildMember extends Event { 
    constructor (client) {
        super(client, {
            name: "guildUpdate"
        });
    };
    /**
     * @param {GuildMember} oldGuild
     * @param {GuildMember} newGuild
     */
    run (oldGuild, newGuild) {
        if (oldGuild.name == newGuild.name) return;
        this.client.logger.warn(`(${oldGuild.name}) server name changed to (${newGuild.name})`);
        
    };
};
