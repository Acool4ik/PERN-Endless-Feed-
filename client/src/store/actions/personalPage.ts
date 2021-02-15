/// <reference path="../../react-app-env.d.ts" />
import {State} from '../../react-app-env'


// All Type Actions
export enum EActionsPersonalData {
    CHANGE_PROFILE = 'CHANGE_PROFILE',
    DELETE_PROFILE = 'DELETE_PROFILE',

    CHANGE_POST = 'CHANGE_POST',
    DELETE_POST = 'DELETE_POST',
    
    SET_ONLINE = 'SET_ONLINE',
    SET_LOADING = 'SET_LOADING',

    TOGGLE_LIKE = 'TOGGLE_LIKE',
    WRITE_COMMENT = 'WRITE_COMMENT'
}


export interface IChangeProfile {
    type: EActionsPersonalData.CHANGE_PROFILE,
    payload: State.IPersonalData
}

export interface IDeleteProfile {
    type: EActionsPersonalData.DELETE_PROFILE
}

export interface IChangePost {
    type: EActionsPersonalData.CHANGE_POST,
    payload: State.IPost[]
}

export interface IDeletePost {
    type: EActionsPersonalData.DELETE_POST,
    payload: State.IPost[]
}

export interface ISetOnline {
    type: EActionsPersonalData.SET_ONLINE,
    payload: State.ISetOnline
}

export interface ISetLoading {
    type: EActionsPersonalData.SET_LOADING,
    payload: State.ISetLoading
}

export interface IToggleLike {
    type: EActionsPersonalData.TOGGLE_LIKE,
    payload: State.IPost[] 
}

export interface IWriteComment {
    type: EActionsPersonalData.WRITE_COMMENT,
    payload: State.IPost[]
}


// All Interface Actions
export type TActionsPersonalPage = IChangeProfile 
    | IDeleteProfile 
    | IChangePost 
    | IDeletePost
    | ISetOnline
    | ISetLoading
    | IToggleLike 
    | IWriteComment