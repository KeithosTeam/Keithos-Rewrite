const Event = require('../../Event');

module.exports = class ready extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true
		});
	}

	async run() {

		this.client.logger.info(this.client.user.tag + ' is online');

		const activityArray = {
			1: this.client.users.cache.size + ' Users',
			2: this.client.guilds.cache.size + ' Guilds',
			3: this.client.commands.size + ' Commands'
		};

		setInterval(() => {
			const activity = activityArray[Math.floor(Math.random() * 3)];
			this.client.user.setActivity(activity, { type: 'WATCHING' });
		}, 16000);
	}
};
