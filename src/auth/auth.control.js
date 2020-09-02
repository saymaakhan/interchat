const User = require('./auth.model')
const bcrypt = require('bcrypt')
const keys = require('../../config/keys')

const token = require('../middleware/token')

/*

auth token
1. login/signup (frontend form)
    -> request to server
    -> server query database, verify username & password are correct
    -> server sends an encyrpted token
        -> token has the user ID, rndm garbage, expiry date

session
login/signup
    -> server saves user data (current logged in user) to session storage


request from client
goes to server
<middleware>
server takes request
process
server returns response
*/


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

        res.json({message: `Registered ${req.body.email}.`, token: token.createToken(user)})
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

        res.json({message: "Logged in Successfully", token: token.createToken(user)})
    }
}