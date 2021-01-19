import React, { useEffect } from 'react'

import { useRequest } from './hooks/useRequest'
import { useMessage, EColorMessage } from './hooks/useMessage'
import { useTooltip, EPosition } from './hooks/useTooltip'
import { randomKeyGenerator, useModal } from './hooks/useModal'


export const App = () => {
	const [request, loader, unzip, bundler] = useRequest()
	const message = useMessage()
	const toolpip = useTooltip()
	const [ Modal, Button] = useModal()
	
	

	randomKeyGenerator()

	console.log(process.env.REACT_APP_BASE_URL)


	useEffect(() => {
		
			var elems = document.querySelectorAll('.modal');
			M.Modal.init(elems)
		
	}, [])

	

	

    return (
	<section className="container">
		<div className="row">
            <div className="col s12">
				

			    
			    <div {...Modal()}>
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
						<a href="#!" 
						    className="modal-close waves-effect waves-green btn-flat"
						>
							Agree
						</a>
                    </div>
                </div>

				<button {...Button()}>
					modal
				</button>

				
			</div>
		</div>
	</section>
    )
}


