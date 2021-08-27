const Client = require("./src/structures/Client");
const client = new Client();

global.__basedir = __dirname;

client.logger.info('Loading index.js');

process.on("uncaughtException", (err) => {
    client.logger.error(err)
});

process.on("unhandledRejection", (err) => {
    client.logger.error(err)
});

// process.on("uncaughtExceptionMonitor", (err) => {
//     client.logger.error(err)
// });

client.login(client.config.token);
