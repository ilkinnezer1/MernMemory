import { combineReducers } from 'redux'
import posts from "./reducers"
import auth from './auth'

const reducer = combineReducers({posts, auth}) 

export default reducer

