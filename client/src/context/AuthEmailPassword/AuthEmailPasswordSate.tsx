/// <reference path="../../react-app-env.d.ts" />
import {Auth} from '../../react-app-env'

import React, {useState, useCallback, useLayoutEffect} from 'react'
import {AuthEmailPasswordContext} from './AuthEmailPasswordContext'
import {LSPaths} from '../../paths/general'
import {useLS} from '../../hooks/useLS'


export const AuthEmailPasswordSate: React.FC<Auth.IAuthStateEmailPassword> = ({children, setAuth}) => {
    const {get, set, remove} = useLS()

    const [jwt, setJwt] = useState<string>('')
    const [refresh, setRefresh] = useState<string>('')
    const [uid, setUid] = useState<string>('')

    const SignIn = useCallback((data: Auth.IAuthDataEmailPassrord_Payload) => {
        set(LSPaths.root, data)
        setJwt(data.jwt)
        setRefresh(data.refresh)
        setUid(data.uid)
        setAuth(true)
    }, [setAuth, set])

    const LogOut = useCallback(() => {
        remove(LSPaths.root)
        setJwt('')
        setRefresh('')
        setUid('')
        setAuth(false)
    }, [setAuth, remove])

    
    useLayoutEffect(() => {
        try {
            const data = get(LSPaths.root) as any
            data && SignIn(data)
        } catch(error) {}
    }, [get, SignIn])
    
  
    return <AuthEmailPasswordContext.Provider value={{
        jwt, refresh, uid, SignIn, LogOut
    }}>

        {children}
    
    </AuthEmailPasswordContext.Provider>
}