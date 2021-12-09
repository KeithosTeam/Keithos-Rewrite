const { Client: Discord, Collection, Message, version } = require("discord.js");
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const hash = require('pbkdf2-password')()
const logger = require('../../utils/logger');
const config = require('../../../config.json')
const pkg = require('../../../package.json')
const Schema = require('../../models/config')
const apiSchema = require('../../models/api')
const { mem, cpu, os } = require('node-os-utils');
const token = config.api.token

const botStatsRoute = require('./routes/bot_stats')

app.use('/bot_stats', botStatsRoute)

logger.info('Loading API ');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.get("/database", (req, res) => {
  //if (!auth(req) === 'OK') {return res.end("Auth failure\ncode 0")} else {
  newToken('MCorange', 'passwd')
  authenticate('MCorange', 'passwd')
  res.end('hello')
  req.params.token
//}
})

app.listen(port, () => {
    logger.info(`API listening at http://localhost:${port}`)
  });

