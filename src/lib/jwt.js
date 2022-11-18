const jwt = require('jsonwebtoken')
const { secretkey } = require('../config')

module.exports ={
    sign: (payload) => jwt.sign(payload , secretkey),
    verify: (token) => jwt.verify(token , secretkey),
    timeSign:(payload) => jwt.sign(payload.id,secretkey,payload.expiresIn),
  
}