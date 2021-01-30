// Core Imports
import React, { useState, useCallback } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

// Redux
import {Provider} from 'react-redux'
import {store} from './store/store'

// Castom Hooks
import {useAuth} from './hooks/useAuth'

// Contexts State
import {AuthEmailPasswordSate} from './context/AuthEmailPassword/AuthEmailPasswordSate'

// Castom Components
import {EmailPasswordForm} from './components/auth/EmailPasswordForm'
import Test from './components/text'


export const App = () => {
	const [auth, setAuth] = useState(false)
	const [IsAuthenticated, NotAuthenticated] = useAuth(auth)

	
    return (
	<BrowserRouter>
	<Provider store={store} >
	<AuthEmailPasswordSate setAuth={setAuth} >
	<section className="container">
		
	<IsAuthenticated redirectPath={'/'}>
	    <Route path={'/'} children={<button onClick={() => setAuth(false)}>not auth</button>} />
	</IsAuthenticated>

	<NotAuthenticated redirectPath={'/'}>
	    {/* <Route path={'/'} children={ <EmailPasswordForm />} /> */}
	    <Route path={'/'} children={ <Test/>} />
	</NotAuthenticated>
	
	</section>
	</AuthEmailPasswordSate>
	</Provider>
	</BrowserRouter>
    )
}
