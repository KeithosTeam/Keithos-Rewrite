const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');
const emojis = require('../../../utils/emoji.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class test extends Command {
	constructor(client) {
		super(client, {
			name: 'members',
			description: '',
			examples: [''],
			aliases: ['', ''],
			cooldown: 5,
			toggleCooldown: false,
			ownerOnly: false,
			clientPemissions: [],
			userPermissions: [],
			type: client.types.INFO  
		});
	}
	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */
	async run(message, args) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const members = await message.guild.members.cache;

			const online = members.filter(member => member.presence?.status === "online").size;
			const offline =  members.filter(member => member.presence?.status === "offline").size;
			const dnd =  members.filter(member => member.presence?.status === "dnd").size;
			const afk =  members.filter(member => member.presence?.status === "idle").size;
			const embed = new MessageEmbed()
				.setTitle(`Member Status [${message.guild.members.cache.size}]`)
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.setDescription(stripIndent`
					${emojis.online} **Online:** \`${online}\` members
					${emojis.dnd} **Busy:** \`${dnd}\` members
					${emojis.idle} **AFK:** \`${afk}\` members
					${emojis.offline} **Offline:** \`${offline}\` members
				`)
				.setFooter({ text: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor);
			message.channel.send({ embeds: [embed]});
		});
	}
};
