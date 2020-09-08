const wit = require('../../config/wit')
const axios = require('axios')
const keys = require('../../config/keys')

module.exports = {
    test_message: async (req, res) => {
        res.json({responses: await send_message(req.body.message)})
    },

    send_message: async (input) => {
        return await send_message(input)
    },

    create_skill: (req, res) => {
        axios.post(
            'https://api.wit.ai/entities/skills/keywords?v=20200513',
            {
                keyword: req.body.keyword,
                synonyms: [req.body.keyword, req.body.keyword.toLowerCase()]
            },
            {headers: {authorization: `Bearer ${keys.wit.serverToken}`}}
        )
            .then(data => res.send(`Successfully created skill: ${req.body.keyword}`))
            .catch(error => res.send(error))
    }
}

const send_message = async (input) => {
    let messages = []
    let witResponses = []
    let payload = ''

    const sentences = input.split('. ')

    for(let x=0; x<sentences.length; x++) {
        const words = sentences[x].split(' ')

        for(let y=0; y<words.length; y++) {
            let tempPayload = payload + words[y] + ' '

            if(tempPayload.length < 280) {
                payload = tempPayload
            } else {
                messages.push(payload)
                payload = ''
            }
        }

        messages.push(payload)
        payload = ''
    }
    
    for(let i=0; i<messages.length; i++) {
        try {
            const result = await wit.message(messages[i], {})
            witResponses.push(result)
        } catch (error) {
            console.log(error)
        }
    }

    return witResponses
}