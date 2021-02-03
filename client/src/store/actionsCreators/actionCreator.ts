import {ACTION_1, ACTION_2} from '../actions/actions'
import {IActionReduser1, IActionReduser2} from '../redusers/rootReduser'
import {Dispatch} from 'redux'


export const actionsCreator1: (value: string) => IActionReduser1 = (value = '') => {
    return {
        type: ACTION_1,
        value
    }
}

export const actionsCreator2: (value: number) => IActionReduser2 = (value = 0) => {
    return {
        type: ACTION_2,
        value 
    }
}


// export const actionsCreator2Async = (value: number, dispatch: Dispatch) => {
//     setTimeout(() => {
//         dispatch(actionsCreator2(value))
//     }, 1000)
// }