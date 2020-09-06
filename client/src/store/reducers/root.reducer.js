import { combineReducers } from 'redux'

import authReducer from './auth.reducer'
import coreReducer from './core.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    core: coreReducer,
})

export default rootReducer