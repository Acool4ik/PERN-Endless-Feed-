import { Reducer } from 'react';
import {combineReducers} from 'redux'

import {ACTION_1, ACTION_2} from '../actions/actions'



// interface IState {
//     reduser1: {
//         value: string
//     },
//     reduser2: {
//         value: string
//     }
// }

interface IAction {
    value: string,
    type: typeof ACTION_1 | typeof ACTION_2
}

export const reduser1: Reducer<string, IAction> = (state = 'test1', action) => {
    switch(action.type) {
        case ACTION_1: return action.value;
        case ACTION_2: return action.value;

        default: return state;
    }
}

export const reduser2: Reducer<string, IAction> = (state = 'test2', action) => {
    switch(action.type) {
        case ACTION_1: return action.value;
        case ACTION_2: return action.value;

        default: return state;
    }
}

// export const reduser2 = (state: IState, action: IAction) => {
//     switch(action.type) {
//         case ACTION_1: return {value: action.value};
//         default: return {value: action.value};
//     }
// }


export const rootReduser = combineReducers({reduser1, reduser2})