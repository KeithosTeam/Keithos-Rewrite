const { MessageEmbed } = require("discord.js");
const Schema = require("../../../models/config");
const Event = require("../../Event");


module.exports = class MessageUpdate extends Event {
    constructor(client) {
        super(client, {
            name: "messageUpdate"
        });
    };  

    async run (oldMessage, newMessage) {

        let oldcontent = oldMessage.content;
        let newcontent = newMessage.content;

        if (oldcontent.length === 0) {
            oldcontent = "No content";
        };

        if (newcontent.length === 0) {
            newcontent = "No content";
        };

        const embed = new MessageEmbed()
            .setTitle("Message Updated")
            .setColor("YELLOW")
            .setDescription(`Author: ${oldMessage.author.tag} | Channel: ${oldMessage.channel}`)
            .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true}))
            .addField("From", `${oldcontent}`)
            .addField("To", `${newcontent}`)
            .setTimestamp(Date.now());

        Schema.findOne({ _id: oldMessage.guild.id }, async (e, data) => {
            if (!data || data.messageLog === null) {
                return;
            } else {
                return oldMessage.guild.channels.cache.get(data.messageLog).send({ embeds: [embed]}).catch(e => { return; });
            };
        });
    };
};
