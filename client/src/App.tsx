// Core Imports
import React, { useState } from 'react'
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
	const [auth, setAuth] = useState(true)
	const [IsAuthenticated, NotAuthenticated] = useAuth(auth)


    return (
	<BrowserRouter>
	<Provider store={store} >
	<AuthEmailPasswordSate setAuth={setAuth} >
	<section className="container">
		
	<IsAuthenticated redirectPath={'/'}>
	    <Route path={'/test'} children={<button onClick={() => setAuth(false)}>not auth</button>} />
	    <Route path={'/'} children={<button onClick={() => setAuth(false)}>not auth</button>} />
	</IsAuthenticated>

	<NotAuthenticated redirectPath={'/test'}>
        <Route path={'/test/2'} children={ <Test/> } />
	    <Route path={'/test'} children={ <Test/> } />
	    <Route path={'/'} children={ <EmailPasswordForm />} />
	</NotAuthenticated>
	
	</section>
	</AuthEmailPasswordSate>
	</Provider>
	</BrowserRouter>
    )
}
