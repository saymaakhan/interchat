# interviewSimulator
A chatbot that simulates a job interview and rates the candidates' (end users') responses. Developed by Shrish Mohapatra and Sayma Khan.

## Running Application
In order to run InterChat, clone the project and then complete the following steps. 

1. Start a terminal and change directory to 'interchat'.

### Back-end server
1. Type ``npm install`` to get all dependencies.

2. Create new file in `\config` folder called `keys.js`. Format as follows:
```
module.exports = {
    database: {
        uri: '<INSERT_MONGODB_URL_HERE>'
    },

    apiKey: '<INSERT_RANDOM_STRING_HERE>',

    wit: {
        serverToken: '<INSERT_WIT_SERVER_TOKEN>',

        clientToken: '<INSERT_WIT_CLIENT_TOKEN>'
    }
}
```

3. Type ``npm run dev`` to run back-end.  


### Front-end client
1. Add a new terminal and ensure you are again in the 'interchat' directory. 

2. Now, change directory to 'client'. 

3. Type ``npm install`` to get all dependencies.

4. Type ``npm start`` to run front-end (React application). 
