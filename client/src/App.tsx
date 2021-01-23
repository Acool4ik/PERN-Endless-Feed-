import React, { useState } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import {useAuth} from './hooks/useAuth'
import { useLS } from './hooks/useLS'
import { useLogger } from './devHooks/useLogger'
import {useReader_Image, EForward} from './readers/useReader_Image'



export const App = () => {
	const [auth, setAuth] = useState(true)
	const [IsAuthenticated, NotAuthenticated] = useAuth(auth)
	// const { get, set, remove } = useLS()
	const { _warning, _error, _success, _table } = useLogger()
	const {ReaderForward} = useReader_Image()
	
	const handler = async (e: React.ChangeEvent<HTMLInputElement>) => {

		if(e.target.files![0]) {
			const result = await ReaderForward(e.target.files![0], EForward.FILE_TO_URL)
			console.log('result::', result)
		}
	}


    return (
	<BrowserRouter>
	<section className="container">
		
	<IsAuthenticated redirectPath={'/'}>
		<Route path={'/'}>
			{/* <button onClick={handler}>
				show get api
			</button> */}

			<input type="file" onChange={handler} />
		</Route>
	</IsAuthenticated>

	<NotAuthenticated redirectPath={'/'}>
		<Route path={'/'} children={<button onClick={() => setAuth(true)}>not auth</button>} />
	</NotAuthenticated>
	
	</section>
	</BrowserRouter>
    )
}


