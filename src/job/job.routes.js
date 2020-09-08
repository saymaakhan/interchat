const express = require('express')
const control = require('./job.control')

const router = express.Router()

router.post('/create_job', control.create_job)
router.post('/edit_job', control.edit_job)
router.post('/get_job', control.get_job)
router.post('/delete_job', control.delete_job)

router.post('/create_application', control.create_application)
router.post('/create_response', control.create_response)
router.post('/get_application', control.get_application)
router.post('/get_response', control.get_response)

module.exports = router 