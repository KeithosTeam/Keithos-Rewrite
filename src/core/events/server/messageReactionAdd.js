const { MessageEmbed } = require('discord.js');
const Schema = require('../../../models/config');
const Event = require('../../Event');


module.exports = class MessageDelete extends Event {
	constructor(client) {
		super(client, {
			name: 'messageReactionAdd'
		});
	}  

	async run (message, messageReaction, user) {

        /**
         * idk dont need this yet sooo have this cow instead
         *            (__) 
         *           (oo) 
         *    /------\/ 
         *   / |    ||   
         * *  /\---/\ 
         *    ~~   ~~   
         *   ...."Have you mooed today?"...
         */

		
		// Schema.findOne({ _id: message.guild.id }, async (e, data) => {
		// 	if (!data || data.messageLog === null) {
		// 		return;
		// 	} else {
		// 		return;
		// 	}
		// });
	}
};
