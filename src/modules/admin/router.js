const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/admin/login',controller.LOGIN)
router.post('/admin/register',controller.REGISTER)
router.get('/admin/user',controller.GET)
router.put('/admin/:adminId',controller.PUT)
router.put('/admin/user/account/:userId',controller.PUT_USER)
router.delete('/admin/user/delete/:userId',controller.DELETE)

module.exports = router