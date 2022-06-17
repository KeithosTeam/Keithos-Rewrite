const { prefix } = require('../../config.json');
const { Schema, model } = require('mongoose');

module.exports = model(
	'config',
	new Schema({
		_id: String,
		//main
		prefix: { type: String, default: prefix },
		ip: { type: String, default: null},
		//logs
		messageLog: { type: String, default: null},
		joinLog: { type: String, default: null},
		leaveLog: { type: String, default: null},
		nickLog: { type: String, default: null},
		roleLog: { type: String, default: null},
		modLog: { type: String, default: null},
		// welcomes/farewells
		welcomeLog: { type: String, default: null},
		farewellLog: { type: String, default: null},
		welcomeMsg: { type: String, default: null},
		farewellMsg: { type: String, default: null},
		// roles
		modRole: { type: String, default: null},
		adminRole: { type: String, default: null},
		autoRole: { type: String, default: null},
		muteRole: { type: String, default: null},
		// automod
		autoModList: { type: String, default: null},

		// warns: { type: String, default: null },
		warnAutoKick: { type: Number, default: null},
		
	}, {
		versionKey: false
	})
);
