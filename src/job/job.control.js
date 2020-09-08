const Job = require('./models/job.model')
const Application = require('./models/app.model')
const Response = require('./models/response.model')
const User = require('../auth/auth.model')

const { getUserFromToken } = require('../middleware/token')
const { send_message } = require('../wit/wit.control')

const questions = [
    'Tell me about yourself.',
    'What are your biggest weaknesses?',
    'What are your biggest strengths?',
    'Where do you see yourself in 5 years?',
    'What makes you a good fit for this job?'
]

module.exports = {
    // Job CRUD
    create_job: async (req, res) => {       
        try {
            const user = getUserFromToken(req.headers.token)
            
            let job = await new Job({
                ...req.body,
                userID: user._id
            })

            job.save()
            res.send('Successfully created job.')

        } catch (error) {
            console.log(error.message)
            return res.send('Unable to create job.')
        }        
    },

    edit_job: async (req, res) => {
        try {
            await Job.updateOne({_id: req.body.id}, req.body)
            res.send('Successfully edited job.')

        } catch (error) {
            console.log(error.message)
            return res.send('Unable to edit job.')
        }        
    },

    get_job: async (req, res) => {
        let query = await Job.find(req.body)
        res.json({query})
    },

    delete_job: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.body.id)
            res.send('Successfully deleted job.')

        } catch (error) {
            console.log(error.message)
            return res.send('Unable to delete job.')
        }

    },


    // Application CRUD
    create_application: async (req, res) => {
        try {
            const user = getUserFromToken(req.headers.token)

            const application = await new Application({
                jobID: req.body.jobID,
                userID: user._id
            })

            application.save()

            return res.json({appID: application.id, questions})
        } catch (error) {
            console.log(error.message)
            return res.send('Unable to create application.')
        }
    },    

    create_response: async (req, res) => {
        try {
            const response = await new Response({
                question: req.body.question,
                response: req.body.response,
                appID: req.body.appID,
                wit: await send_message(req.body.response),                
            })

            response.save()
            res.send('Created response.')
        } catch (error) {
            console.log(error.message)
            return res.send('Unable to create response.')
        }
    },

    get_application: async (req, res) => {
        let results = []
        let query = await Application.find(req.body)

        for(let i=0; i<query.length; i++) {
            let app = query[i]
            let user = await User.findById(app.userID)

            results.push({
                ...app,
                email: user.email,
                score: await get_app_rank(app)
            })
        }

        res.json({results})
    },

    get_response: async (req, res) => {
        let query = await Response.find(req.body)
        res.json({query})
    },
}

const get_app_rank = async (app) => {
    let score = 0

    let responses = await Response.find({appID: app._id})
    responses.map(response => {
        let newScore = 0

        for(let i=0; i<response.wit.length; i++) {
            if(response.wit[i].entities['wit$message_subject:message_subject']) {
                newScore += response.wit[i].entities['wit$message_subject:message_subject'].length
            }

            if(response.wit[i].traits && response.wit[i].traits.wit$sentiment[0].value === 'positive') {
                newScore += 10 * response.wit[i].traits.wit$sentiment[0].confidence
            }
        }

        score += newScore/response.wit.length
    })

    return score.toFixed(2)
}