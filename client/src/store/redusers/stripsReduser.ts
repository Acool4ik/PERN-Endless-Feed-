/// <reference path="../../react-app-env.d.ts" />
import {State} from '../../react-app-env'

import {Reducer} from 'redux'
import {initialState} from '../initialState'

interface IActionCreator {type: string}


export const stripsReduser: Reducer<State.IPost[], IActionCreator> = (
    state = initialState.strips, action
) => {
    switch(action.type) {
        default: return state
    }
}