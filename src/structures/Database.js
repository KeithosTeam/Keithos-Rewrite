const Client = require('./Client')
const Event = require("../core/Event");
const Command = require("../core/Command");
module.exports = class Database {

    /**
     * The mongodb url
     * @param {string} url 
     */
    constructor(url) {

        this.mongoose = require("mongoose");
        this.url = url || null;

    };

    /**
     * If you wish to log or not
     * @param {boolean} log 
     */
    connect(log) {
        this.mongoose.connect(this.url, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });


        this.mongoose.connection.on("connected", () => {

            if (log) {
                this.connect()
                // this.url.logger.info("Database connected");
                // this.connected()
                // console.log("Database connected")
            };
        });
    };
};
