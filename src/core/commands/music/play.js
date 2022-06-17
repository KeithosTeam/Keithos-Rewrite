const { MessageEmbed } = require('discord.js');
const Command = require('../../Command');
const DisTube = require('distube');
const Schema = require('../../../models/config');


module.exports = class Vote extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			description: 'The music play command',
			aliases: ['p','pause', 'hold', 'resume', 'unpause', 'stop', 's', 'disconnect','leave' , 'skip', 'queue', 'q'],
			type: client.types.MUSIC
		});
	}

	async run(message, args) {

		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
			const prefix = data.prefix;
			const x = message.content.replace(prefix, '').split(' ')[0];
			const distube = new DisTube.default(message.client,{
				updateYouTubeDL: false
			});

			if (['play', 'p'].includes(x)){

				message.channel.send({ content: 'Loading... This could take a second' });
				distube.play(message, args.join(' '));	
				distube.on('playSong', (queue, song) => queue.textChannel.send(
					`${this.emoji.success}Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
				));

			} else if (['stop', 's', 'disconnect', 'leave'].includes(x)) {

				const queue = distube.getQueue(message);
				if (!queue) return message.channel.send({ content: `${this.emoji.fail} | There is nothing in the queue right now!` });
				queue.stop();
				message.channel.send({ content: `${this.emoji.success} | Stopped!` });

			} else if (['skip'].includes(x)){

				const queue = distube.getQueue(message);
				if (!queue) return message.channel.send({ content: `${this.emoji.error} | There is nothing in the queue right now!` });
				const song = queue.skip();
				message.channel.send({ content: `${this.emoji.success} | Skipped! Now playing:\n${song.name}` });

			} else if (['pause', 'hold'].includes(x)){

				const queue = message.client.distube.getQueue(message);
				if (!queue) return message.channel.send({ content: `${this.emoji.error} | There is nothing in the queue right now!`});

				if (queue.pause) {
					queue.resume();
					return message.channel.send({ text: 'Resumed the song for you :)' });
				}

				queue.pause();
				message.channel.send({ content: 'Paused the song for you :P' });

			} else if (['resume', 'unpause'].includes(x)){

				const queue = message.client.distube.getQueue(message);
				if (!queue) return message.channel.send({ content: `${this.emoji.error} | There is nothing in the queue right now!`});
				queue.resume();
				message.channel.send(this.emoji.success + ' Resumed the song for you :P');

			} else if (['queue', 'q'].includes(x)){

				const queue = message.client.distube.getQueue(message);
				if (!queue) return message.channel.send({ content: `${message.client.emotes.error} | There is nothing playing!` });
				const q = queue.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n');
				message.channel.send({ content: `${message.client.emotes.queue} | **Server Queue**\n${q}` });

			}
		});
	}
};
