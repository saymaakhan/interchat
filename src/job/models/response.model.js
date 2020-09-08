const mongoose = require("mongoose")

const responseSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    wit: {
        type: Array,
    },
    appID: {
        type: String,
        required: true
    }
})

const register = mongoose.model('response', responseSchema)
module.exports = register