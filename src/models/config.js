const { prefix } = require("../../config.json");
const { Schema, model } = require("mongoose");

module.exports = model(
    "config",
    new Schema({
        _id: String,
        prefix: { type: String, default: prefix}
    }, {
        versionKey: false
    })
)
