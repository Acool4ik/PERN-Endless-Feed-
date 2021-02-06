/// <reference types="react-scripts" />


export namespace Auth {

    export interface IAuthDataEmailPassrord {
        message: string,
        payload?: {
            jwt: string,
            refresh: string,
            uid: string
        }
    }
    
    export interface IAuthDataEmailPassrord_Payload {
        jwt: string,
        refresh: string,
        uid: string
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
    export interface IPhoto {
        _id: readonly string | number,
        url: string
    }

    export interface IVideo {
        url: string,
        type: string
    } 

    export interface ILike {
        uid: readonly string | number,
        name: string,
        avatar?: string
    }

    export interface IComment {
        uid: readonly string | number,
        name: string,
        avatar?: string,
        photo?: IPhoto,
        video?: IVideo,
        comment: string
    }

    export interface IPost {
        _id: readonly string | number,
        photos: IPhoto[],
        video?: IVideo,
        description?: string,
        comments?: IComment[],
        likes?: ILike[] 
    }

    export interface IUserState {
        uid: readonly string | number,
        email: readonly string,
        name: string,
        isOnline: boolean,
        avatar?: string,
        status?: string,
        posts?: IPost[]
    }

    export interface IInitialState {
        personalPage: IUserState, 
        strips: IPost[]
    }
}


