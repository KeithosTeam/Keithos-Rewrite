const { Message, MessageEmbed } = require('discord.js');
const Schema = require('../../../models/config');
const Event = require('../../Event');


module.exports = class MessageDelete extends Event {
	constructor(client) {
		super(client, {
			name: 'messageDelete'
		});
	}  
    
	async run (messages) {

		const embed = new MessageEmbed()
			.setTitle('Bulk Message Delete')
			.setColor('RED')
			.setDescription(messages.content)
			.setThumbnail(messages.author.displayAvatarURL({ dynamic: true}))
			.addField('Author', `${messages.author.username} (${messages.author.id})`)
			.addField('Channel', `${messages.channel}`)
			.setTimestamp(Date.now());

		Schema.findOne({ _id: messages.guild.id }, async (e, data) => {
			if (!data || data.messageLog === null) {
				return;
			} else {
				return messages.guild.channels.cache.get(data.messageLog).send({ embeds: [embed]}).catch(e => { return; });
			}


		});
	}
};
