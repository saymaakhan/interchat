const User = require('./auth.model')
const bcrypt = require('bcrypt')
const keys = require('../../config/keys')


module.exports = {
    signup: async (req, res) => {
        let user = await User.findOne({email: req.body.email});

        if(user) {
            return res.send("Sorry, a user with that email already exists.")
        }

        req.body.password = await bcrypt.hash(
            req.body.password + keys.apiKey,
            10
        )

        user = await new User(req.body)
        user.save()

        res.send(`Registered ${req.body.email}.`)
    },

    login: async (req, res) => {
        let user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.send("Sorry, a user with that email does not exist.")
        }

        const validated = await bcrypt.compare(
            req.body.password + keys.apiKey,
            user.password
        )

        if(!validated) {
            return res.send("Sorry, the password you entered is incorrect.")
        }

        res.send("Logged in Successfully")
    }
}