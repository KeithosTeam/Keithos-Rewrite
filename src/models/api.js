const { prefix } = require('../../config.json');
const { Schema, model } = require('mongoose');

module.exports = model(
	'api',
	new Schema({
		_id: String,
        token: String
	}, {
		versionKey: false
	})
);
