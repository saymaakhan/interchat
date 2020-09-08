import axios from 'axios'

const DEV_URL = 'http://localhost:5000'

export const get_jobs = (token, userID, profile_type) => {
    return async (dispatch) => {
        try {
            let requestBody = {}

            if(profile_type === 'business') {
                requestBody = {userID}
            }

            const result = await axios.post(
                `${DEV_URL}/job/get_job`,
                requestBody,
                {headers: {token: `${token}`}}
            )
            
            if(result.data.query) {
                return dispatch({type: 'FETCH_SUCCESS', jobs: result.data.query})
            } else {
                return dispatch({type: 'FETCH_ERROR'})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const create_job = (token, job) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(
                `${DEV_URL}/job/create_job`,
                job,
                {headers: {token: `${token}`}}
            )
            
            if(result.data.query) {
                return dispatch({type: 'CREATE_SUCCESS'})
            } else {
                return dispatch({type: 'CREATE_ERROR'})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'CREATE_ERROR'})
        }
    }
}

export const select_job = (job) => {
    return dispatch => {
        return dispatch ({type: 'SELECT_JOB', job})
    }
}

export const select_application = (application) => {
    return dispatch => {
        return dispatch ({type: 'SELECT_APP', application})
    }
}

export const create_application = (token, jobID) => {
    return async dispatch => {
        try {
            const result = await axios.post(
                `${DEV_URL}/job/create_application`,
                {jobID},
                {headers: {token: `${token}`}}
            )
            
            if(result.data.questions) {
                return dispatch({
                    type: 'APPLICATION_SUCCESS',
                    questions: result.data.questions,
                    appID: result.data.appID
                })
            } else {
                return dispatch({type: 'APPLICATION_ERROR'})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'APPLICATION_ERROR'})
        }
    }
}

export const create_response = (token, appID, question, response) => {
    return async dispatch => {
        try {
            const result = await axios.post(
                `${DEV_URL}/job/create_response`,
                {appID, question, response},
                {headers: {token: `${token}`}}
            )

            return dispatch({type: 'CREATE_SUCCESS'})
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'CREATE_ERROR'})
        }
    }
}

export const get_applications = (token, jobID) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(
                `${DEV_URL}/job/get_application`,
                {jobID},
                {headers: {token: `${token}`}}
            )
            
            if(result.data.results) {
                return dispatch({type: 'FETCH_APP_SUCCESS', applications: result.data.results})
            } else {
                return dispatch({type: 'FETCH_APP_ERROR'})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'FETCH_APP_ERROR'})
        }
    }
}

export const get_responses = (token, appID) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(
                `${DEV_URL}/job/get_response`,
                {appID},
                {headers: {token: `${token}`}}
            )
            
            if(result.data.query) {
                return dispatch({type: 'FETCH_RES_SUCCESS', responses: result.data.query})
            } else {
                return dispatch({type: 'FETCH_RES_ERROR'})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'FETCH_RES_ERROR'})
        }
    }
}