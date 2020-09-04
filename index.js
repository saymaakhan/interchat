// Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Routers
const authRouter = require('./src/auth/auth.routes')
const jobRouter = require('./src/job/job.routes')
const witRouter = require('./src/wit/wit.routes')

// Services
const database = require('./config/database')

const app = express()
const port = 5000

app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

app.use('/auth', authRouter)
app.use('/job', jobRouter)
app.use('/wit', witRouter)

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})