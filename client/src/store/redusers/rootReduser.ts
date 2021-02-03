import {combineReducers, Reducer} from 'redux'
import {ACTION_1, ACTION_2} from '../actions/actions'


export interface IActionReduser1 {
    value: string,
    type: string
}

export interface IActionReduser2 {
    value: number,
    type: string
}


export const reduser1: Reducer<string, IActionReduser1> = (state = 'state1 string', action: IActionReduser1) => {
    switch(action.type) {
        case ACTION_1: return action.value;

        default: return state;
    }
}

const reduser2: Reducer<number, IActionReduser2> = (state = 110010, action: IActionReduser2) => {
    switch(action.type) {
        case ACTION_2: return action.value;

        default: return state;
    }
}


export const rootReduser = combineReducers({
    state1: reduser1, 
    state2: reduser2
})