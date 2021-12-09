function auth(req){
    if (req.query.token === token) {
      console.log('OK')
      console.log(token)
      console.log(req.query.token)
      return 'OK'
  
  
    } else {
      console.log('fail')
      console.log(token)
      console.log(req.query.token)
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
      apiSchema.updateOne({ _id: nick, hash: hash })
      apiSchema.updateOne({ _id: nick, token: pass })
      apiSchema.updateOne({ _id: nick, salt: salt })
    }
    if (err) throw err;
    return
    });
  });
  }