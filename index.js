const Client = require('./src/structures/Client');
const client = new Client();

global.__basedir = __dirname;

client.logger.info('Loading index.js');

process.on('uncaughtException', (err) => {
	client.logger.error(err);
});

process.on('unhandledRejection', (err) => {
	client.logger.error(err);
});

// process.on("uncaughtExceptionMonitor", (err) => {
//     client.logger.error(err)
// });

client.on("messageCreate", (message) => {
	//console.log(message.content)

	const array = ["290545409481244672", "892091860586217522"]
	var toggle = true
	if (toggle == false) return
	if (!array.includes(message.author.id)) {
		return;
	};


});

if (client.config.devMode == false){
	client.login(client.config.bot.token);
} else {
	client.login(process.env['token']);
}


//api_init(client)
//client.login(client.config.token);
