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


