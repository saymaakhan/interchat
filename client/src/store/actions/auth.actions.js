import axios from 'axios'

const DEV_URL = 'http://localhost:5000'

export const authenticate = (user, type) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(`${DEV_URL}/auth/${type}`, user)            

            if(result.data.token) {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('userID', result.data.userID)
                localStorage.setItem('profile_type', result.data.profile_type)

                return dispatch({
                    type: 'AUTH_SUCCESS',
                    token: result.data.token,
                    userID: result.data.userID,
                    profile_type: result.data.profile_type,
                })
            } else {
                return dispatch({type: 'AUTH_ERROR', message: result.data})
            }
        } catch(error) {
            console.log(error.message)
            return dispatch({type: 'AUTH_ERROR', message: error.message})
        }
    }
}

export const local_authenticate = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const userID = localStorage.getItem('userID')
        const profile_type = localStorage.getItem('profile_type')

        if(token && userID && profile_type) {
            dispatch({type: 'AUTH_SUCCESS', token, userID, profile_type})
        }
    }
}