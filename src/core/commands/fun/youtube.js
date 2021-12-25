const { Message, MessageEmbed} = require('discord.js');
const Command = require('../../Command');
const search = require('youtube-search');

module.exports = class youtube extends Command {
	constructor(client) {
		super(client, {
            name: 'youtube',
            aliases: ['yt'],
            usage: 'youtube <video name>',
            description: 'Searches YouTube for the specified video.',
            type: client.types.FUN,
            examples: ['youtube That\'s a ten']
	    });
    }
	/**
     * @param {Message} message 
     * @param {string[]} args 
     */
	async run(message, args) {
        const apiKey = this.client.config.apiKeys.googleApi;
        const videoName = args.join(' ');
        if (!videoName) return this.utils.sendErrorMessage(message, this, 'Please provide a YouTube video name');
        const searchOptions = { maxResults: 1, key: apiKey, type: 'video' };
        if (!message.channel.nsfw) searchOptions['safeSearch'] = 'strict';
        let result = await search(videoName, searchOptions)
          .catch(err => {
            message.client.logger.error(err);
            return this.utils.sendErrorMessage(message, this, 'Please try again in a few seconds', err.message);
          });
        result = result.results[0];
        if (!result) 
          return this.utils.sendErrorMessage(message, this, 'Unable to find video, please provide a different YouTube video name');
        const decodedTitle = he.decode(result.title);
        const embed = new MessageEmbed()
          .setTitle(decodedTitle)
          .setURL(result.link)
          .setThumbnail('https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png')
          .setDescription(result.description)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        if (message.channel.nsfw) embed.setImage(result.thumbnails.high.url);
        message.channel.send({ embeds: [embed] });
	}
};
