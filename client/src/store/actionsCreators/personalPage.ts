/// <reference path="../../react-app-env.d.ts" />
import {State} from '../../react-app-env'

// Core imports
import {Dispatch} from 'redux'

// Actions for personal page
import * as Actions from '../actions/personalPage'


// Set Loading Action
type TSetLoadingCreator = (loading: boolean) => Actions.ISetLoading
export const setLoadingCreator: TSetLoadingCreator = (loading) => ({
    type: Actions.EActionsPersonalData.SET_LOADING,
    payload: { loading }
})


// Change Profile Action
type TChangeProfileCreator = (name: string, status?: string, avatar?: string) => Actions.IChangeProfile
export const changeProfileCreator: TChangeProfileCreator = (name, status, avatar) => ({
    type: Actions.EActionsPersonalData.CHANGE_PROFILE,
    payload: {name, status, avatar}
})

// Delete Profile Action
type TDeleteProfileCreator = () => Actions.IDeleteProfile
export const deleteProfileCreator: TDeleteProfileCreator = () => ({
    type: Actions.EActionsPersonalData.DELETE_PROFILE
})


// Toggle Like Action 
type TToggleLikeCreator = (posts: State.IPost[]) => Actions.IToggleLike
export const toggleLikeCreator: TToggleLikeCreator = (posts) => ({
    type: Actions.EActionsPersonalData.TOGGLE_LIKE,
    payload: [...posts]
})




