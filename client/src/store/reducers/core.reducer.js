const initState = {
    jobs: [],
    message: ''
}

const coreReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                jobs: action.jobs,
                message: ''
            }
        
        case 'FETCH_ERROR':
            return {
                ...state,
                jobs: [],
                message: 'Unable to fetch data.'
            }
        
        default:
            return state
    }
}

export default coreReducer