/// <reference path="../../react-app-env.d.ts" />
import {State} from '../../react-app-env'

import {combineReducers, Reducer} from 'redux'
import {initialState} from '../initialState'
import {CHANGE_PROFILE} from '../actions/actions'


interface IActionCreator {
    type: string,
    payload?: any
}

export const personalPageReduser: Reducer<State.IUserState, IActionCreator>  = (
    state = initialState.personalPage, action
) => {
    switch(action.type) {
        case CHANGE_PROFILE: return {...state, ...action.payload };
        default: return {...state}
    }
}


export const stripsReduser: Reducer<State.IPost[], IActionCreator> = (
    state = initialState.strips, action
) => {
    switch(action.type) {
        default: return state
    }
}


export const rootReduser = combineReducers({
    personalPage: personalPageReduser, 
    strips: stripsReduser
})