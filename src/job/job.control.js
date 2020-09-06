const Job = require('./job.model')
const { getUserFromToken } = require('../middleware/token')

module.exports = {
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

    }

}
