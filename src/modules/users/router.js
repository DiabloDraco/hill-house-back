const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/login',controller.LOGIN)
router.post('/register',controller.REGISTER)
router.get('/user',controller.GET)
router.post('/user/image',controller.upload, controller.POST)
// router.put('/user/balance',controller.BALANCEPUT)

module.exports = router