import {combineReducers} from 'redux'
import alert from './Alert'
import auth from './Auth'
import profile from './Profile'

const rootReducer = combineReducers({
    alert,
    auth,
    profile
})

export default rootReducer