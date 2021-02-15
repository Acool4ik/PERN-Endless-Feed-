/// <reference path="../../../../react-app-env.d.ts" />
import {State} from '../../../../react-app-env'

// Core imports
import React, {useEffect, Fragment, useContext, useMemo} from 'react'
import {Link} from 'react-router-dom'

// Styles modules
import styles from '../../../styles/Header.module.css'

// Auth Context
import {AuthEmailPasswordContext} from '../../../../context/AuthEmailPassword/AuthEmailPasswordContext'

// Castom Components
import {useToggleLike} from '../../../../store/hooks/personalPage/useToggleLike'
import {randomKeyGenerator} from '../../../../hooks/useModal'


export const Header: React.FC<State.IPost> = (post) => {
    const {_id, photos, video, description, likes, comments} = post
    const toggleLike = useToggleLike()
    
    const {uid} = useContext(AuthEmailPasswordContext)

    useEffect(() => {
        const elems = document.querySelectorAll('.dropdown-trigger')
        M.Dropdown.init(elems)
    }, [])

    const toggleLikeHandler = () => {
        console.log(_id);
        
        toggleLike(_id)
    }

    const key = useMemo(() => randomKeyGenerator(), [])

    return (
    <Fragment>
    <section className={`card-content white-text ${styles.wrapperHeader}`}>
        <span className={`card-title ${styles.author}`}>Author: @Acool4ik</span>
        <div className={styles.numberWrapper} >
            {
                likes?.length && likes?.length > 0
                ? <span className={styles.numberWrapper} onClick={toggleLikeHandler} >
                    <span className={styles.number}>{likes.length}</span>
                    <i className="material-icons">favorite</i>
                </span>
                : <span className={styles.numberWrapper} onClick={toggleLikeHandler} >
                    <span className={styles.number}>{0}</span>
                    <i className="material-icons">favorite_border</i>
                </span>
            }
            
            <i className={`material-icons dropdown-trigger ${styles.marginIcon}`} 
                data-target={`dropdown_${key}`}
            >
                more_vert
            </i>
        </div>
    </section>
    
    <ul id={`dropdown_${key}`} className={`dropdown-content ${styles.dropDown}`}>
        <li>
            <Link to={`/frontend/page/${uid}/post/${_id}/edit`} >
                <i className="material-icons">mode_edit</i>Edit
            </Link>
        </li>
        <li className="divider" tabIndex={-1}></li>
        <li>
            <Link to={`/frontend/page/${uid}/post/${_id}/delete`} >
                <i className="material-icons">delete</i>Delete
            </Link>
        </li>
    </ul>
    </Fragment>
    )
}