const Client = require('./src/structures/Client');
const client = new Client();
const { exec } = require('child_process');
const config = require('./config.json');

const startupScripts = (check) => { 
	if (check == true) {
		client.logger.info('Scripts enabled');

		if (config.database.verbose == true){
			
			exec('./startdb.sh', (error, stdout, stderr) => {  //executes a local os command. In this case starts the script startdb.sh
				if (error) {
					client.logger.error(`[DB] error: ${error.message}`);
					return;
				}
				if (stderr) {
					client.logger.error(`[DB] stderr: ${stderr}`);
					return;
				}
				client.logger.info(`[DB] stdout: ${stdout}`);
			});
		} else {
			exec('./startdb.sh');
		}
	}
};

startupScripts(false);

global.__basedir = __dirname;

client.logger.info('Loading index.js');

process.on('uncaughtException', (err) => {
	client.logger.error(err);
});

process.on('unhandledRejection', (err) => {
	client.logger.error(err);
});

// process.on('uncaughtExceptionMonitor', (err) => {
//     client.logger.error(err)
// });

client.on('messageCreate', (message) => {
	//console.log(message.content)

	const array = ['290545409481244672', '892091860586217522'];
	var toggle = true;
	if (toggle == false) return;
	if (!array.includes(message.author.id)) {
		return;
	}

	if (message.content != '!emit') return;

	client.emit('guildCreate', client.guilds.cache.get('857582338573205545'));

});
client.login(client.config.bot.token);



//api_init(client)
//client.login(client.config.token);
