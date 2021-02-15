/// <reference path="../../../react-app-env.d.ts" />
import {State} from '../../../react-app-env'

// Core imports
import React from 'react'

// Styles modules
import styles from '../../styles/Post.module.css'

// Castom components
import {Slider} from './details/Slider'
import {Header} from './details/Header'
import {Accordeon} from './details/Accordeon'


export const Post: React.FC<State.IPost> = (props) => {

    console.log(props);
    
    return (
    <section className={`col s12 row ${styles.padding}`} >
    <div className={`card N/A transparent col s12 row ${styles.padding}`}>   
        <Header {...props} />
        <Slider />
        <Accordeon />
    </div>
    </section>
    )
}