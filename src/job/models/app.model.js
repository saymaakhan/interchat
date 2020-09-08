const mongoose = require("mongoose")

const appSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    jobID: {
        type: String,
        required: true
    }
})

const register = mongoose.model('application', appSchema)
module.exports = register