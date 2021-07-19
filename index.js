const Client = require("./src/structures/Client");
const client = new Client();

process.on("uncaughtException", (error) => {
    require("./src/errors/uncaughtException")(error);
});

process.on("unhandledRejection", (error) => {
    require("./src/errors/unhandledRejection")(error);
});

process.on("uncaughtExceptionMonitor", (error) => {
    require("./src/errors/uncaughtExceptionMonitor")(error);
});

client.login(client.config.token);
