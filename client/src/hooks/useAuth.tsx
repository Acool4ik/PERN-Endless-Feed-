import React, { useCallback } from 'react'
import { Switch, Redirect } from 'react-router-dom'


interface IAuth {
    children: JSX.Element,
    redirectPath: string
}

type TAuthHandlers = (props: IAuth) =>  JSX.Element | null
type TUseAuth = (isAuth: boolean) => [TAuthHandlers, TAuthHandlers]


export const useAuth: TUseAuth = (isAuth = false) => { 


    const IsAuthenticated: TAuthHandlers = useCallback(({ 
        children = null, redirectPath = '/'
    }) => {

        if(isAuth) {
            return <Switch>
                
                {
                    React.Children.map(children, (child) => child)
                }

                <Redirect to={process.env.PUBLIC_URL + redirectPath} />
            </Switch>
        } else {
            return null
        }

    }, [isAuth])



    const NotAuthenticated: TAuthHandlers = useCallback(({ 
        children = null, redirectPath = '/'
    }) => {

        if(!isAuth) {
            return <Switch>
                
                {
                    React.Children.map(children, (child) => child)
                }

                <Redirect to={process.env.PUBLIC_URL + redirectPath} />
            </Switch>
        } else {
            return null
        }
    }, [isAuth])



    return [IsAuthenticated, NotAuthenticated]
}
