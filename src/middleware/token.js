const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")

module.exports = {
    createToken: (user) => (
        jwt.sign(
            {
                user: user,
                date: Date.now()
            },
            keys.apiKey,
            {expiresIn: "1h"}
        )
    ),

    getUserFromToken: (token) => {
        const decrypted = jwt.verify(token, keys.apiKey)
        return decrypted.user
    }
}