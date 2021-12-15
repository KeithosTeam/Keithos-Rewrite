const { prefix } = require('../../config.json');
const { Schema, model } = require('mongoose');

module.exports = model(
	'config',
	new Schema({
		_id: String,
		prefix: { type: String, default: prefix },
		messageLog: { type: String, default: null},
		joinLog: { type: String, default: null},
		leaveLog: { type: String, default: null},
		nickLog: { type: String, default: null},
		roleLog: { type: String, default: null},
		welcomeLog: { type: String, default: null},
		farewellLog: { type: String, default: null},
		joinMsg: { type: String, default: null},
		leaveMsg: { type: String, default: null},
		ip: { type: String, default: null},
		modLog: { type: String, default: null}
	}, {
		versionKey: false
	})
);
