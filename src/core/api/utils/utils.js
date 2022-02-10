const fs = require('fs');
const hash = require('pbkdf2-password')()
const logger = require('../../../utils/logger');
const config = require('../../../../config.json')
const pkg = require('../../../../package.json')
const Schema = require('../../../models/config')
const apiSchema = require('../../../models/api')
const { mem, cpu, os } = require('node-os-utils');
const token = config.api.token


function auth(req){
    if (req.query.token === token) {
      logger.info('OK')
      return 'OK'
  
  
    } else {
      logger.info('fail')
      return 'ERROR: Auth Fail. Code 0 '
      
    }
  }
  
  function authenticate(nick, pass) {
    apiSchema.findOne({ _id: nick }, async (e, data) => {
  
    if (!data) return console.log('cannot find token id')
    hash({ password: data.token, salt: data.salt }, function (err, pass, salt, hash) {
      if (!hash === data.hash) return console.log('Err')
      console.log('hash:' + hash)
      console.log('data.hash:' + data.hash)
  
    });
  })}
  
  
  
  function newToken(nick, token){
  hash({ password: token }, function (err, pass, salt, hash) {
    apiSchema.findOne({ _id: nick }, async (e, data) => {
      
    if (!data){

      data = new apiSchema({ _id: nick });
      data.save();
      console.log('nodata')
    }
      apiSchema.updateOne({ _id: nick, hash: hash })
      apiSchema.updateOne({ _id: nick, token: pass })
      apiSchema.updateOne({ _id: nick, salt: salt })
      data.save();
      console.log('data')
    if (err) throw err;
    return
    });
  });
  }

module.exports = {
  auth,
  authenticate,
  newToken
}