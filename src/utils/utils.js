const { MessageEmbed } = require('discord.js');
const schedule = require('node-schedule');
const { stripIndent } = require('common-tags');
const { fail } = require('./emoji.json');
const Schema = require('../models/config')
	
	function sendErrorMessage(message, command, reason="None", errorMessage="None", errorType="Command Failure") {
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {	
			const embed = new MessageEmbed()
				.setTitle(`${fail} Error: \`${command.name}\``)
				.setDescription(`**Reason:**\`\`\`diff\n- ${errorType}\n+ ${reason}\`\`\``) /** `**Error Type:**\`\`\`\n- ${errorType}\`\`\`\ \n*/
				.addField('Usage:', `\`\`\`${data.prefix}${command.example}\`\`\``)
				.setTimestamp()
				.setThumbnail(message.member.displayAvatarURL())
				.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
				.setColor(message.guild.me.displayHexColor);
	
			if (errorMessage) embed.addField('Error Message:', `\`\`\`s${errorMessage}\`\`\``);
	
			message.channel.send({ embeds: [embed] });
		});
	};

	  /**
   * Creates and sends mod log embed
   * @param {Message} message
   * @param {string} reason 
   * @param {Object} fields
   */
	   async function sendModLogMessage(message, reason, action, fields = {}) {
		   console.log(this.name)
		Schema.findOne({ _id: message.guild.id }, async (e, data) => {
		const modLogId = data.modLog
		const modLog = message.guild.channels.cache.get(modLogId); 
		if (
		  modLog &&
		  modLog.viewable &&
		  modLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
		) {
		  const embed = new MessageEmbed()
			.setTitle(`Action: \`${action}\``)
			.addField('Moderator', message.member, true)
			.setTimestamp()
			.setThumbnail(message.member.displayAvatarURL())
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(message.guild.me.displayHexColor);
		  for (const field in fields) {
			console.log('lul')
			embed.addField(field, fields[field], true);
		  }
		  embed.addField('Reason', reason);
		  modLog.send({ embeds: [embed]})
		}
	})
}

  /**
   * Gets member from mention
   * @param {Message} message 
   * @param {string} mention 
   */
  function getMemberFromMention(message, mention) {
    if (!mention) return;
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return message.guild.members.cache.get(id);
  }

  /**
   * Gets role from mention
   * @param {Message} message 
   * @param {string} mention 
   */
  function getRoleFromMention(message, mention) {
    if (!mention) return;
    const matches = mention.match(/^<@&(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return message.guild.roles.cache.get(id);
  }

  /**
   * Gets text channel from mention
   * @param {Message} message 
   * @param {string} mention 
   */
  function getChannelFromMention(message, mention) {
    if (!mention) return;
    const matches = mention.match(/^<#(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return message.guild.channels.cache.get(id);
  }





	  /**
	 * Gets current array window range
	 * @param {Array} arr
	 * @param {int} current
	 * @param {int} interval
	 */
	function getRange(arr, current, interval) {
	  const max = (arr.length > current + interval) ? current + interval : arr.length;
	  current = current + 1;
	  const range = (arr.length == 1 || arr.length == current || interval == 1) ? `[${current}]` : `[${current} - ${max}]`;
	  return range;
	}



  /**
   * Keith's Reaction Menu class
   */
class ReactionMenu {
  
	/**
	 * Create new ReactionMenu
	 * @param {Client} client
	 * @param {TextChannel} channel
	 * @param {GuildMember} member
	 * @param {MessageEmbed} embed
	 * @param {Array} arr
	 * @param {int} interval 
	 * @param {Object} reactions
	 * @param {int} timeout 
	 */
	constructor(client, channel, member, embed, arr = null, interval = 10, reactions = {
	  '⏪': this.first.bind(this), 
	  '◀️': this.previous.bind(this), 
	  '▶️': this.next.bind(this), 
	  '⏩': this.last.bind(this), 
	  '⏹️': this.stop.bind(this)
	}, timeout = 120000) {
  
	  /**
	   * The Keith's Client
	   * @type {Client}
	   */
	  this.client = client;
  
	  /**
	   * The text channel
	   * @type {TextChannel}
	   */
	  this.channel = channel;
  
	  /**
	   * The member ID snowflake
	   * @type {string}
	   */
	  this.memberId = member.id;
  
	  /**
	   * The embed passed to the Reaction Menu
	   * @type {MessageEmbed}
	   */
	  this.embed = embed;
  
	  /**
	   * JSON from the embed
	   * @type {Object}
	   */
	  this.json = this.embed.toJSON();
  
	  /**
	   * The array to be iterated over
	   * @type {Array}
	   */
	  this.arr = arr;
  
	  /**
	   * The size of each array window
	   * @type {int}
	   */
	  this.interval = interval;
  
	  /**
	   * The current array window start
	   * @type {int}
	   */
	  this.current = 0;
  
	  /**
	   * The max length of the array
	   * @type {int}
	   */
	  this.max = (this.arr) ? arr.length : null;
  
	  /**
	   * The reactions for menu
	   * @type {Object}
	   */
	  this.reactions = reactions;
  
	  /**
	   * The emojis used as keys
	   * @type {Array<string>}
	   */
	  this.emojis = Object.keys(this.reactions);
  
	  /**
	   * The collector timeout
	   * @type {int}
	   */
	  this.timeout = timeout;
  
	  const first = new MessageEmbed(this.json);
	  const description = (this.arr) ? this.arr.slice(this.current, this.interval) : null;
	  if (description) first
		.setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
		.setDescription(description);
  
	  this.channel.send(first).then(message => {
  
		/**
		 * The menu message
		 * @type {Message}
	   */
		this.message = message;
  
		this.addReactions();
		this.createCollector();
	  });
	}
  
	/**
	 * Adds reactions to the message
	 */
	async addReactions() {
	  for (const emoji of this.emojis) {
		await this.message.react(emoji);
	  }
	}
  
	/**
	 * Creates a reaction collector
	 */
	createCollector() {
	  
	  // Create collector
	  const collector = this.message.createReactionCollector((reaction, user) => {
		return (this.emojis.includes(reaction.emoji.name) || this.emojis.includes(reaction.emoji.id)) &&
		  user.id == this.memberId;
	  }, { time: this.timeout });
	  
	  // On collect
	  collector.on('collect', async reaction => {
		let newPage =  this.reactions[reaction.emoji.name] || this.reactions[reaction.emoji.id];
		if (typeof newPage === 'function') newPage = newPage();
		if (newPage) await this.message.edit(newPage);
		await reaction.users.remove(this.memberId);
	  }); 
  
	  // On end
	  collector.on('end', () => {
		this.message.reactions.removeAll();
	  });
  
	  this.collector = collector;
	}
  
	/**
	 * Skips to the first array interval
	 */
	first() {
	  if (this.current === 0) return;
	  this.current = 0;
	  return new MessageEmbed(this.json)
		.setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
		.setDescription(this.arr.slice(this.current, this.current + this.interval));
	}
  
	/**
	 * Goes back an array interval
	 */
	previous() {
	  if (this.current === 0) return;
	  this.current -= this.interval;
	  if (this.current < 0) this.current = 0;
	  return new MessageEmbed(this.json)
		.setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
		.setDescription(this.arr.slice(this.current, this.current + this.interval));
	}
  
	/**
	 * Goes to the next array interval
	 */
	next() {
	  const cap = this.max - (this.max % this.interval);
	  if (this.current === cap || this.current + this.interval === this.max) return;
	  this.current += this.interval;
	  if (this.current >= this.max) this.current = cap;
	  const max = (this.current + this.interval >= this.max) ? this.max : this.current + this.interval;
	  return new MessageEmbed(this.json)
		.setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
		.setDescription(this.arr.slice(this.current, max));
	}
  
	/**
	 * Goes to the last array interval
	 */
	last() {
	  const cap = this.max - (this.max % this.interval);
	  if (this.current === cap || this.current + this.interval === this.max) return;
	  this.current = cap;
	  if (this.current === this.max) this.current -= this.interval;
	  return new MessageEmbed(this.json)
		.setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
		.setDescription(this.arr.slice(this.current, this.max));
	}
  
	/**
	 * Stops the collector
	 */
	stop() {
	  this.collector.stop();
	}
  };


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = {
	sendErrorMessage,
	sendModLogMessage,
	getMemberFromMention,
	getRoleFromMention,
	getChannelFromMention,
	ReactionMenu,
	getRange,
	capitalize
};

