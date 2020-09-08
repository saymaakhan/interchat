const initState = {
    jobs: [],
    selectedJob: null,
    message: '',

    questions: [],
    appID: '',

    applications: [],
    selectedApp: null,
    responses: [],
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
        
        case 'FETCH_APP_SUCCESS':
            return {
                ...state,
                applications: action.applications,
                message: ''
            }
        
        case 'FETCH_APP_ERROR':
            return {
                ...state,
                applications: [],
                message: 'Unable to fetch applications.'
            }
        
        case 'FETCH_RES_SUCCESS':
            return {
                ...state,
                responses: action.responses,
                message: ''
            }
        
        case 'FETCH_RES_SUCCESS':
            return {
                ...state,
                responses: [],
                message: 'Unable to fetch responses.'
            }

        case 'SELECT_JOB':
            return {
                ...state,
                selectedJob: action.job,
            }
        
        case 'SELECT_APP':
            return {
                ...state,
                selectedApp: action.application,
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
        
        case 'APPLICATION_SUCCESS':
            return {
                ...state,
                questions: action.questions,
                appID: action.appID 
            }

        case 'APPLICATION_ERROR':
            return {
                ...state, 
                questions: [],
                appID: ''
            }
            
        default:
            return state
    }
}

export default coreReducer