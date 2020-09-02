const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

const register = mongoose.model('job', jobSchema)
module.exports = register