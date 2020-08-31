const express = require('express')
const control = require('./auth.control')

const router = express.Router()

router.post('/signup', control.signup)
router.post('/login', control.login)

module.exports = router 