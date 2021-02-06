import React, {useEffect, Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import styles from '../styles/Header.module.css'
import {AuthEmailPasswordContext} from '../../context/AuthEmailPassword/AuthEmailPasswordContext'

export const Header = () => {
    // const {uid} = useContext(AuthEmailPasswordContext)
    const uid = 1
    const postId = 3
    const isLiked = true

    useEffect(() => {
        const elems = document.querySelectorAll('.dropdown-trigger')
        M.Dropdown.init(elems)
    }, [])

    const x = Date.now()

    return (
    <Fragment>
    <section className={`card-content white-text ${styles.wrapperHeader}`}>
        <span className={`card-title ${styles.author}`}>Author: @Acool4ik</span>
        <div >
            {
                isLiked ? <i className="material-icons">favorite</i> : <i className="material-icons">favorite_border</i>
            }
            
            <i className={`material-icons dropdown-trigger ${styles.marginIcon}`} 
                data-target={`dropdown_${x}`}
            >
                more_vert
            </i>
        </div>
    </section>
    
    <ul id={`dropdown_${x}`} className={`dropdown-content ${styles.dropDown}`}>
        <li>
            <Link to={`/frontend/page/${uid}/post/${postId}/edit`} >
                <i className="material-icons">mode_edit</i>Edit
            </Link>
        </li>
        <li className="divider" tabIndex={-1}></li>
        <li>
            <Link to={`/frontend/page/${uid}/post/${postId}/delete`} >
                <i className="material-icons">delete</i>Delete
            </Link>
        </li>
    </ul>
    </Fragment>
    )
}