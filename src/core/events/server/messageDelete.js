const { MessageEmbed } = require('discord.js');
const Schema = require('../../../models/config');
const Event = require('../../Event');


module.exports = class MessageDelete extends Event {
	constructor(client) {
		super(client, {
			name: 'messageDelete'
		});
	}  

	async run (message) {

		const embed = new MessageEmbed()
			.setTitle('Message Deleted')
			.setColor('RED')
			.setDescription(message.content)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
			.addField('Author', `${message.author.tag} (${message.author.id})`)
			.addField('Channel', `${message.channel}`)
			.setTimestamp(Date.now());

		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			if (!data || data.messageLog === null) {
				return;
			} else {
				return message.guild.channels.cache.get(data.messageLog).send({ embeds: [embed]}).catch(e => { return; });
			}
		});
	}
};
