const Client = require("./structures/Client");
const client = new Client();

process.on("uncaughtException", (error) => {
    require("./errors/uncaughtException")(error);
});

process.on("unhandledRejection", (error) => {
    require("./errors/unhandledRejection")(error);
});

process.on("uncaughtExceptionMonitor", (error) => {
    require("./errors/uncaughtExceptionMonitor")(error);
});

client.login(client.config.token);
