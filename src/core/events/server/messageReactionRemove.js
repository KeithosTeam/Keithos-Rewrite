const { MessageEmbed } = require('discord.js');
const Schema = require('../../../models/config');
const Event = require('../../Event');


module.exports = class MessageDelete extends Event {
	constructor(client) {
		super(client, {
			name: 'messageReactionRemove'
		});
	}  

	async run (message, messageReaction, user) {

		/** 						      /~\                               
		 *		R2-D2!                   |oo )                              
 		 *	Where are you?         #     _\=/_    #                         
 		 *							\\  /  _  \  //                         
 		 *							 \\//|/.\|\\//                          
 		 *							  \/  \_/  \/                           
 		 *								 |\ /|                              
 		 *								 \_ _/                              
 		 *								 | | |                              
 		 *								 | | |                              
 		 *								 []|[]                              
 		 *								 | | |                              
 		 *_______________________________/_]_[_\_____________________________
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
