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

if (client.config.devMode == false){
			client.login(client.config.token);
				} else {
					client.login(process.env['token']);
				}
//client.login(client.config.token);
