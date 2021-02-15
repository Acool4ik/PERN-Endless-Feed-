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
import {UserPage} from './components/pages/UserPage'
import {Strips} from './components/pages/Strips'
import {Navbar} from './components/pages/Navbar'


export const App = () => {
	const [auth, setAuth] = useState(true)
	const [IsAuthenticated, NotAuthenticated] = useAuth(auth)


    return (
	<BrowserRouter>
	<Provider store={store} >
	<AuthEmailPasswordSate setAuth={setAuth} >
	<section className="container">
		
	<IsAuthenticated redirectPath={'/frontend/page/1'}>
	    <Route path="/frontend">
		    <Navbar />
		    <Route path={'/frontend/page/:id'} children={<UserPage />} />
	        <Route path={'/frontend/strips'} children={<Strips />} />
		</Route>
	</IsAuthenticated>

	<NotAuthenticated redirectPath={'/'}>
	    <Route path={'/'} children={ <EmailPasswordForm />} />
	</NotAuthenticated>
	
	</section>
	</AuthEmailPasswordSate>
	</Provider>
	</BrowserRouter>
    )
}
