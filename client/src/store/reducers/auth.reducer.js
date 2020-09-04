const initState = {
    isAuth: false,
    userID: '',
    token: '',
    message: '',
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...state,
                isAuth: true,
                userID: action.userID,
                token: action.token,
                message: ''
            }
        
        case 'AUTH_ERROR':
            return {
                ...state,
                isAuth: false,
                userID: '',
                token: '',
                message: action.message
            }
        
        default:
            return state
    }
}

export default authReducer