const { prefix } = require('../../config.json');
const { Schema, model } = require('mongoose');

module.exports = model(
	'userdata',
	new Schema({
		_id: String,
		warns: { type: String, default: null },

	}, {
		versionKey: false
	})
);
