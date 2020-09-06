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
