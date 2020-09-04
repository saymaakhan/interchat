import axios from 'axios'

const DEV_URL = 'http://localhost:5000'

export const authenticate = (user, type) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(`${DEV_URL}/auth/${type}`, user)
            
            if(result.data.token) {
                return dispatch({type: 'AUTH_SUCCESS', token: result.data.token, userID: result.data.userID})
            } else {
                return dispatch({type: 'AUTH_ERROR', message: result.data})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'AUTH_ERROR', message: error.message})
        }
    }
}
