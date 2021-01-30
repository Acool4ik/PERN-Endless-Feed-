
export enum EAuthPaths {
    AUTH_EMAIL_PASSWORD_LOGIN = 'backend/auth/emailpassword/login',
    AUTH_EMAIL_PASSWORD_SIGNUP = 'backend/auth/emailpassword/signup'
}
 
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


