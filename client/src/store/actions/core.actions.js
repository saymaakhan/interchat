import axios from 'axios'

const DEV_URL = 'http://localhost:5000'

export const get_jobs = (token) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(
                `${DEV_URL}/job/get_job`,
                {},
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
