const { Client: Discord, Collection, Message, version } = require('discord.js');
const express = require('express')
// TODO: use csurf middleware for token validation
const app = express().disable('x-powered-by')
const fs = require('fs');
const hash = require('pbkdf2-password')()
const logger = require('../../utils/logger');
const config = require('../../../config.json')
const port = config.api.port
const pkg = require('../../../package.json')
const Schema = require('../../models/config')
const apiSchema = require('../../models/api')
const { mem, cpu, os } = require('node-os-utils');
const token = config.api.token
const bodyParser = require('body-parser');

const { auth, authenticate, newToken} = require('./utils/utils')

logger.info('Loading API ');

app.use('/bot_stats', './routes/bot_stats')
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'CORS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.get('/', (req, res) => {
  res.end('Henlo World!');
});

app.get('/database', (req, res) => {
  if (!auth(req) === 'OK') {return res.end('Auth failure\ncode 0')} else {
  res.end('hello')
}
})

app.listen(port, () => {
    logger.info(`API listening at http://localhost:${port}`)
  });
