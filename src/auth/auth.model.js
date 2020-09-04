const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_type: {
        type: String, 
        required: true
    }
})

const register = mongoose.model('user', userSchema)
module.exports = register