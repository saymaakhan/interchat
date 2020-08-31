const mongoose = require('mongoose')
const keys = require('./keys')

mongoose.connect(keys.database.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err))