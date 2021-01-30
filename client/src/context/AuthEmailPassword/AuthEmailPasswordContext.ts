import {createContext} from 'react'
import {IAuthDataEmailPassrord_Payload} from '../../pathsRequest/auth.paths'

interface IContextAuthEmailPassword {
    jwt?: string,
    uid?: string,
    refresh?: string
    SignIn: (data: IAuthDataEmailPassrord_Payload) => void,
    LogOut: () => void
}


export const AuthEmailPasswordContext = createContext({} as IContextAuthEmailPassword)
