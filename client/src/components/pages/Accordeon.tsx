import React from 'react'
import styles from '../styles/Accordeon.module.css'
import {Chat} from './Chat'


export const Accordeon = () => {


    return (
    <ul className="collapsible">
        <li className="N/A transparent"> 
            <div className="collapsible-header N/A transparent">
                <i className="material-icons">filter_drama</i>
                Description
                <span className="new badge N/A transparent">4</span>
            </div>
            <div className={`collapsible-body ${styles.description}`}>
                <p>- Lorem ipsum dolor sit amet.</p>
            </div>
        </li>

        <li className="N/A transparent"> 
            <div className="collapsible-header N/A transparent">
                <i className="material-icons">filter_drama</i>
                Comments
                <span className="new badge N/A transparent">4</span>
            </div>
            <div className={`collapsible-body ${styles.wrapperChat}`}>
                <Chat />
            </div>
        </li>
    </ul>    
    )
}