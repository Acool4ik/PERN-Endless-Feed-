import {compose, applyMiddleware, createStore} from 'redux'

// import {initialState} from './initialState'
import {rootReduser} from './redusers/rootReduser'
import thunk from 'redux-thunk'


export const store = createStore(rootReduser, compose(
    applyMiddleware(thunk),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

