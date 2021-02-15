import {combineReducers} from 'redux'

// all redusers
import {personalPageReduser} from './personalPage'
import {stripsReduser} from './stripsReduser'


export const rootReduser = combineReducers({
    personalPage: personalPageReduser, 
    strips: stripsReduser
})