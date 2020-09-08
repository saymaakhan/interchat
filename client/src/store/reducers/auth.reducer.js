const initState = {
    isAuth: false,
    userID: '',
    token: '',
    profile_type: '',
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
                profile_type: action.profile_type,
                message: ''
            }
        
        case 'AUTH_ERROR':
            return {
                ...state,
                isAuth: false,
                userID: '',
                token: '',
                profile_type: '',
                message: action.message
            }
        
        case 'SIGN_OUT':
            return initState
        
        default:
            return state
    }
}

export default authReducer