import React, {useContext} from 'react'
import {AuthEmailPasswordContext} from '../../context/AuthEmailPassword/AuthEmailPasswordContext'
import styles from '../styles/Post.module.css'
import {Slider} from './Slider'
import {Header} from './Header'
import {Accordeon} from './Accordeon'


export const Post = () => {
    const {uid} = useContext(AuthEmailPasswordContext)


    return (
    <section className={`col s12 row ${styles.padding}`} >
    <div className={`card N/A transparent col s12 row ${styles.padding}`}>   
        <Header />
        <Slider />
        <Accordeon />
    </div>
    </section>
    )
}