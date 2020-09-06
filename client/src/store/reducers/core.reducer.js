const initState = {
    jobs: [],
    selectedJob: null,
    message: '',
}

const coreReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                jobs: action.jobs,
                selectedJob: action.jobs[0],
                message: ''
            }
        
        case 'FETCH_ERROR':
            return {
                ...state,
                jobs: [],
                message: 'Unable to fetch data.'
            }

        case 'SELECT_JOB':
            return {
                ...state,
                selectedJob: action.job,
            }

        case 'CREATE_SUCCESS':
            return {
                ...state,                
            }

        case 'CREATE_ERROR':
            return {
                ...state, 
                message: 'Unable to create job.'
            }
        
        default:
            return state
    }
}

export default coreReducer