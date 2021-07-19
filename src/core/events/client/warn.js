const Event = require("../../Event");
const Logger = require("@ayanaware/logger").default;

module.exports = class warn extends Event {
    constructor(client) {
        super(client, {
            name: "warn"
        });

        this.logger = Logger.get("warn");
    };

    run(warn) {

        this.logger.info(warn);
        
    };
};
