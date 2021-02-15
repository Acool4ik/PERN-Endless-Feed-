/// <reference types="react-scripts" />

import { type } from "os";


export namespace Auth { 
    export interface IAuthDataEmailPassrord_Payload {
        jwt: string,
        refresh: string,
        uid: string
    }

    export interface IAuthDataEmailPassrord {
        message: string,
        payload?: IAuthDataEmailPassrord_Payload
    }
    
    export interface IContextAuthEmailPassword {
        jwt?: string,
        uid?: string,
        refresh?: string
        SignIn: (data: IAuthDataEmailPassrord_Payload) => void,
        LogOut: () => void
    }

    export interface IAuthStateEmailPassword {
        children: React.ReactNode,
        setAuth: React.Dispatch<React.SetStateAction<boolean>>
    }

}


export namespace State {
    export type TID = readonly string | number

    export interface IPhoto {
        _id: TID,
        url: string
    }

    export interface IVideo {
        url: string,
        type: string
    } 

    export interface ILike {
        uid: TID,
        name: string,
        avatar?: string
    }

    export interface IComment extends ILike {
        comment: string
    }

    export interface IChangedPost {
        photos: IPhoto[],
        video?: IVideo,
        description?: string,
    }

    export interface IPost extends IChangedPost {
        _id: TID,
        comments?: IComment[],
        likes?: ILike[] 
    }

    export interface IPersonalData {
        name: string,
        status?: string,
        avatar?: string,
    }

    export interface ISetLoading {
        loading: boolean
    }

    export interface ISetOnline {
        isOnline: boolean
    }

    interface IUserState extends IPersonalData {
        uid: TID,
        email: readonly string,
        isOnline: boolean,
        loading: boolean
        posts?: IPost[]
    }
  

    export interface IInitialState {
        personalPage: IUserState, 
        strips: IPost[]
    }
}


