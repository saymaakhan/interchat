const wit = require('../../config/wit')
const axios = require('axios')
const keys = require('../../config/keys')

module.exports = {
    send_message: (req, res) => {
        let messages = []
        let payload = ''

        const sentences = req.body.message.split('. ')

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
        
        messages.map((message, index) => {
            wit.message(message, {})
                .catch(error => console.log(error))
        })

        res.json({messages})
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