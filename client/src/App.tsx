import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import {useAuth} from './hooks/useAuth'
import {useReader_Image} from './readers/useReader_Image'


export const App = () => {
	const [auth, setAuth] = useState(true)
	const [IsAuthenticated, NotAuthenticated] = useAuth(auth)
	
	const {readerForward, loading} = useReader_Image()
	
	const handler = async (e: React.ChangeEvent<HTMLInputElement>) => {

		if(e.target.files![0]) {
			readerForward(e.target.files![0])
		}

	}

	useEffect(() => {
		// @ts-ignore
		console.log('result::', window.$)

		// @ts-ignore
		if(window.$ && window.$.URL_IMAGE) {

			
            // @ts-ignore
			fetch(window.$.URL_IMAGE).then(async r => {
				const blob = await r.blob()
				console.log(blob instanceof Blob)
				console.log('Blob from fetch', blob)
				
				
				const file = new File([blob], 'test', {type: blob.type})
				console.log(file instanceof File)
				console.log('File from blob', file)

				
				
				
			})
			

			
		}
		
		
		
	}, [loading])



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


