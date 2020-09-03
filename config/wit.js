const keys = require('./keys')
const {Wit} = require('node-wit')

const client = new Wit({
    accessToken: keys.wit.serverToken
});

module.exports = client