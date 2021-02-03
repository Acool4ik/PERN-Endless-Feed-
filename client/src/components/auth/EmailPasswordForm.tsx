/// <reference path="../../react-app-env.d.ts" />
import {Auth} from '../../react-app-env'

// Core Imports
import React, {useState, useEffect, useRef, useContext} from 'react'

// AuthEmailPasswordContext
import {AuthEmailPasswordContext} from '../../context/AuthEmailPassword/AuthEmailPasswordContext'

// Castom Hooks
import {useMessage, EColorMessage} from '../../hooks/useMessage'
import {useRequest} from '../../hooks/useRequest'

// Castom components
import {Loader} from '../general/Loader'

// Supporting tools
import {EAuthPaths} from '../../paths/general'


export const EmailPasswordForm: React.FC = () => {
    const {SignIn} = useContext(AuthEmailPasswordContext)

    const [ request, loading, unzip] = useRequest()
    const message = useMessage()

    const formLogin = useRef<HTMLFormElement>(null)
    const formSignup = useRef<HTMLFormElement>(null)

    const [disabled, setDisabled] = useState<boolean>(false)

    const [emailLogin, setEmailLogin] = useState<string>('')
    const [emailSignup, setEmailSignup] = useState<string>('')

    const [passwordLogin, setPasswordLogin] = useState<string>('')
    const [passwordSignup, setPasswordSignup] = useState<string>('')
    const [passwordRepeatSignup, setPasswordRepeatSignup] = useState<string>('')

    const clearFields = () => {
        setDisabled(false)
        setEmailLogin('')
        setEmailSignup('')
        setPasswordLogin('')
        setPasswordSignup('')
        setPasswordRepeatSignup('')
    }

    const disabledFields = (e: React.MouseEvent) => {
        if(disabled) {
            e.stopPropagation();
            e.preventDefault();
        } 
    }

    const submitLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(formLogin.current) {
            const formData = new FormData(formLogin.current)
            const loginPassword = formData.get('loginPassword') as string
            
            if(loginPassword.length < 6) {
                message('Password must have at least 6 characters', EColorMessage.yellow)
                return
            } 
            
            try {
                setDisabled(true)
                const response = await request(EAuthPaths.AUTH_EMAIL_PASSWORD_LOGIN, 'POST', formData)
                
                if(response.ok) {
                    const {payload, message: report} = await unzip(response) as Auth.IAuthDataEmailPassrord
                    message(report, EColorMessage.green)

                    setDisabled(false)
                    clearFields()
                    payload && SignIn(payload)
                } else {
                    throw new Error(response.statusText)
                }
            } catch(error) {
                const errorMessage = error.message || 'Something going wrong...'
                message(errorMessage, EColorMessage.red)
                setDisabled(false)
            }
        }
    }

    const submitSignupHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        if(formSignup.current) {
            const formData = new FormData(formSignup.current)
            const signupPassword = formData.get('signupPassword') as string
            const signupRepeatPassword = formData.get('signupRepeatPassword') as string

            if(signupPassword.length < 6) {
                message('Password must have at least 6 characters', EColorMessage.yellow)
                return
            } 

            if(signupPassword !== signupRepeatPassword) {
                message('Passwords do not match', EColorMessage.red)
                return
            }

            try {
                setDisabled(true)
                const response = await request(EAuthPaths.AUTH_EMAIL_PASSWORD_SIGNUP, 'POST', formData)
                
                if(response.ok) {
                    const {payload, message: report} = await unzip(response) as Auth.IAuthDataEmailPassrord
                    message(report, EColorMessage.green)

                    setDisabled(false)
                    clearFields()
                    payload && SignIn(payload)
                } else {
                    throw new Error(response.statusText)
                }
            } catch(error) {
                const errorMessage = error.message || 'Something going wrong...'
                message(errorMessage, EColorMessage.red)
                setDisabled(false)
            }
            
           
        }
    }

    useEffect(() => {
        M.Tabs.init(document.body.querySelectorAll('.tabs'), {swipeable: true})
    }, [])


    return (
    <section className="row authform-margin-top" onClickCapture={disabledFields}>
        
    {
        loading && <div className="verticle-margin" children={<Loader isCircle={false} />} />
    }

    <ul className="tabs N/A transparent">
        <li className="tab col s6">
            <a className="active" href="#login">LogIn</a>
        </li>
        <li className="tab col s6">
            <a href="#signup">SignUp</a>
        </li>
    </ul>


    <div id="login" className="row">
    <form onSubmit={submitLoginHandler} ref={formLogin} >
        <div className="input-field col s12 verticle-margin">
            <input className="validate grey-text text-lighten-4"
                id="l-email" 
                type="email" 
                name="loginEmail"
                value={emailLogin}
                onChange={e => setEmailLogin(e.target.value)}
            />
            <label htmlFor="l-email">Enter Email</label>
        </div>
    
        <div className="input-field col s12 verticle-margin">
            <input className="validate grey-text text-lighten-4"
                id="l-password" 
                type="password" 
                name="loginPassword"
                value={passwordLogin}
                onChange={e => setPasswordLogin(e.target.value)}
            />
            <label htmlFor="l-password">Enter Password</label>
        </div>

        <button className="btn waves-effect waves-light col s4 offset-s8 border verticle-margin" 
            type="submit"
        >
            LogIn
            <i className="material-icons right">send</i>
        </button>    
    </form>    
    </div>


    <div id="signup" className="row">
    <form onSubmit={submitSignupHandler} ref={formSignup}>
        <div className="input-field col s12 verticle-margin">
            <input className="validate grey-text text-lighten-4"
                id="s-email" 
                type="email" 
                name="signupEmail"
                value={emailSignup}
                onChange={e => setEmailSignup(e.target.value)}
            />
            <label htmlFor="s-email">Enter Email</label>
        </div>
    
        <div className="input-field col s12 verticle-margin">
            <input className="validate grey-text text-lighten-4"
                id="s-password" 
                type="password" 
                name="signupPassword"
                value={passwordSignup}
                onChange={e => setPasswordSignup(e.target.value)}
            />
            <label htmlFor="s-password">Create Password</label>
        </div>

        <div className="input-field col s12 verticle-margin">
            <input className="validate grey-text text-lighten-4"
                id="r-password" 
                type="password" 
                name="signupRepeatPassword"
                value={passwordRepeatSignup}
                onChange={e => setPasswordRepeatSignup(e.target.value)}
            />
            <label htmlFor="r-password">Repeat Password</label>
        </div>

        <button className="btn waves-effect waves-light col s4 offset-s8 border verticle-margin" 
            type="submit"
        >
            SignUp
            <i className="material-icons right">send</i>
        </button>
    </form>
    </div>

    
    </section>
    )
}