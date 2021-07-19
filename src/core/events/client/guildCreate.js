const Event = require("../../Event");
const Schema = require("../../../models/config");
const { Guild } = require("discord.js");

module.exports = class guildCreate extends Event {
    constructor(client) {
        super(client, {
            name: "guildCreate"
        });
    };

    /**
     * @param {Guild} guild 
     */
    async run(guild) {

        Schema.findOne({ _id: guild.id }, async (err, data) => {

            if (data) {
                return;
            } else {
                data = new Schema({ _id: guild.id });
                data.save();
            };
        });

        console.log("Data is created");
    };
};
