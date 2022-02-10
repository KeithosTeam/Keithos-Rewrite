const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const Command = require('../../Command');
const Schema = require('../../../models/config');


module.exports = class arror extends Command {
	constructor(client) {
		super(client, {
			name: 'regenschema',
			description: 'regens the db for that server',
			cooldown: 8, 
			toggleCooldown: true,
			type: client.types.OWNER
		});
	}

	async run (message, args) {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
				const embed = new MessageEmbed()
					.setTitle('Regenerate Schema')
					.setColor(this.client.config.embed.color)
					.addField('Warning!', 'Are you sure you wanna proceed to regenerating the servers shema(database). this is gonna delete all your settings!')
					.setThumbnail(this.client.user.displayAvatarURL())
					.setFooter(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true}))
					.setTimestamp();

				const button1 = new MessageButton()
					.setStyle('DANGER')
					.setCustomId("regendb1")
					.setLabel('Regenerate')

				const row = new MessageActionRow()
					.addComponents(button1);
				message.channel.send({ embeds: [embed], components: [row]});

				await message.client.on('interactionCreate', interaction => {
					if (interaction.customId == "regendb1" || interaction.isButton()){
					const embed2 = new MessageEmbed()
						.setTitle('Regenerate Schema')
						.setColor(this.client.config.embed.color)
						.addField('Are you sure?', 'Are you totaly sure, this action is unrecoverable!')
						.setThumbnail(this.client.user.displayAvatarURL())
						.setFooter(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true}))
						.setTimestamp();

						const button2 = new MessageButton()
							.setStyle('DANGER')
							.setCustomId("regendb2")
							.setLabel('YES i am! And stop asking!')

						const row2 = new MessageActionRow()
							.addComponents(button2);
						
						message.channel.send({ embeds: [embed2], components: [row2]});

						message.client.on('interactionCreate', interaction2 => {
							if (interaction2.customId == "regendb2" || interaction2.isButton()){

								Schema.deleteOne({ _id: message.guild.id }, function (err) {
								  if (err) return handleError(err);
								});
								data = new Schema({ _id: message.guild.id });
								data.save();
								return message.channel.send("Aight dude, doing it now")
							}

						})

					}
					
				});

		})
	}
};
