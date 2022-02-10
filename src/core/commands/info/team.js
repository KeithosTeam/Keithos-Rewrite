const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');


module.exports = class credit extends Command {
	constructor(client) {
		super(client, {
			name: 'team',
			description: 'Meet our team members and contributors',
			aliases: ['team'],
			cooldown: 8, 
			toggleCooldown: true,
			type: client.types.INFO
		});
	}

	async run (message, args) {

		const team = new MessageEmbed()
			.setTitle('Meet our Team')
			.setColor('AQUA')
			.setThumbnail(this.client.user.displayAvatarURL())
			.addField('Developers', '1. [MCorange](https://github.com/MCorange99) - Lead Developer\n\n2. [Colderry](https://github.com/Colderry) - Co Lead Developer')
			.addField('Contributors', 'None');

		return message.channel.send({ embeds: [team]});
	}
};
