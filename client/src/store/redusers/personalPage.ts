/// <reference path="../../react-app-env.d.ts" />
import {State} from '../../react-app-env'

import {initialState} from '../initialState'
import * as Actions from '../actions/personalPage'
import {Reducer} from 'redux'




export const personalPageReduser: Reducer<State.IUserState, Actions.TActionsPersonalPage>  = (
    state = initialState.personalPage, action
) => {
    switch(action.type) {
        case Actions.EActionsPersonalData.CHANGE_PROFILE: 
            return {...state, ...action.payload };
        case Actions.EActionsPersonalData.DELETE_PROFILE:
            return { ...initialState.personalPage };
        case Actions.EActionsPersonalData.CHANGE_POST:
            return {...state, posts: action.payload };
        case Actions.EActionsPersonalData.DELETE_POST:
            return {...state, posts: action.payload };
        case Actions.EActionsPersonalData.SET_ONLINE:
            return {...state, ...action.payload };
        case Actions.EActionsPersonalData.SET_LOADING:
            return {...state, ...action.payload };
        case Actions.EActionsPersonalData.TOGGLE_LIKE:
            return {...state, posts: action.payload};
        case Actions.EActionsPersonalData.WRITE_COMMENT:
            return {...state, posts: action.payload};

        default: return {...state};
    }
}