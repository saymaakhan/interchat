const express = require('express')
const control = require('./wit.control')

const router = express.Router()

router.post('/send_message', control.send_message)
router.post('/create_skill', control.create_skill)

module.exports = router