import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import {useAuth} from './hooks/useAuth'
import {useReader, IReader} from './hooks/useReader'
import {Loader} from './components/Loader'



export const App = () => {
	const [auth, setAuth] = useState(true)
	const [IsAuthenticated, NotAuthenticated] = useAuth(auth)
	
	const {reader, loadingReader, byte} = useReader()
	
	const handler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target.files![0]) {
			const file = e.target.files![0]
			const buffer = await file.arrayBuffer()
			const _URL = URL.createObjectURL(file)
			
			const B_TO_F = reader(5)(1) as IReader[5][1]
			
            B_TO_F(file, () => {
				// console.log(dataURL)
                // console.log(uehfef);	
			})
			
		}
	}

	useEffect(() => {
        console.log(`Status of load: ${loadingReader ? 'Loading...' : 'Loaded!'}`)
	}, [loadingReader])

	useEffect(() => {
		console.log(`Loaded byte ${byte[0]} from ${byte[1]}`)
	}, [byte])



    return (
	<BrowserRouter>
	<section className="container">
		
	<IsAuthenticated redirectPath={'/'}>
		<Route path={'/'}>
			{/* <button onClick={handler}>
				show get api
			</button> */}
			{/* <a ref={aaa} href="" download> test </a> */}
			<input type="file" onChange={handler} />

			{
				loadingReader && <Loader isCircle={false} />
			}


		</Route>
	</IsAuthenticated>

	<NotAuthenticated redirectPath={'/'}>
		<Route path={'/'} children={<button onClick={() => setAuth(true)}>not auth</button>} />
	</NotAuthenticated>
	
	</section>
	</BrowserRouter>
    )
}


