import React, {useContext, useEffect, Fragment, useState} from 'react'
import {NavLink, Link, useLocation, useHistory} from 'react-router-dom'
import styles from '../styles/Navbar.module.css'

import {AuthEmailPasswordContext} from '../../context/AuthEmailPassword/AuthEmailPasswordContext'
import {useModal} from '../../hooks/useModal'
import {useDeleteProfile} from '../../store/hooks/personalPage/useDeleteProfile'


export const Navbar = () => {
    const {LogOut, uid} = useContext(AuthEmailPasswordContext)
    const location = useLocation()
    const history = useHistory()

    const modal = useModal()
    const deletePage = useDeleteProfile()


    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav')
        M.Sidenav.init(elems)
        history.push(`/frontend/page/${uid}`)
    }, [history, uid])
    
    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [modal])

    const freezedLinkDefaultBehavior = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }

    const deleteAccauntHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        
        setTimeout(() => {
            LogOut()
            deletePage()
        }, 1000)
    }


    return (
    <Fragment>
    <nav className={`fixed-navbar-top ${styles.bcNavbar}`}>
    <div className={`nav-wrapper container`}>
        <Link to={`/frontend/page/${uid}`} className={`brand-logo left ${styles.logoHover}`}>
            <i className="material-icons">cloud</i>Acool4ik
        </Link>

        <a href="#!" data-target="mobile-demo" className="sidenav-trigger right">
            <i className="material-icons">menu</i>
        </a>

        <ul className={`right hide-on-med-and-down ${styles.btnHover}`}>
            <li>
                <NavLink to="/frontend/strips">
                    <i className="material-icons">forum</i>
                </NavLink>
            </li>

            <li>
                <NavLink to={`/frontend/page/${uid}`}>
                    <i className="material-icons">home</i>
                </NavLink>
            </li>

            <li>
                <a href={`${location.pathname}`}>
                    <i className="material-icons">refresh</i>
                </a>
            </li>

            <li onClick={() => LogOut()} >
                <Link to="/">
                    <i className="material-icons">delete</i>
                </Link>
            </li>

            <li {...modal[1]('modal-trigger btn-flat')}  >
                <Link onClick={freezedLinkDefaultBehavior} to={location.pathname}>
                    <i className={`material-icons ${styles.jchchk}`}>bug_report</i>
                </Link>
            </li>
            
        </ul>
    </div>
    </nav>


    <ul className="sidenav" id="mobile-demo">
        <li>
            <NavLink to="/frontend/strips">
                <i className="material-icons">forum</i>
                Strips Page
            </NavLink>
        </li>

        <li>
            <NavLink to={`/frontend/page/${uid}`}>
                <i className="material-icons">home</i>
                Home Page
            </NavLink>
        </li>

        <li>
            <a href={`${location.pathname}`}>
                <i className="material-icons">refresh</i>
                Refresh the page
            </a>
        </li>

        <li onClick={() => LogOut()} >
            <Link to="/">
                <i className="material-icons">delete</i>
                Exit
            </Link>
        </li>

        <li {...modal[1]('modal-trigger btn-flat')} >
            <Link onClick={freezedLinkDefaultBehavior} to={location.pathname}>
                <i className="material-icons">bug_report</i>
                Delete Page
            </Link>
        </li>

    </ul>

    <section {...modal[0]()} >
        <h6 className={`black-text modal-content ${styles.textDeletePage}`}>
            @Do you want delete the accaunt?
            <i className="material-icons left">delete_forever</i>
        </h6>

        <div className="modal-footer">
            <a href="#!" onClick={deleteAccauntHandler}
                {...modal[1]('modal-close btn-flat btn waves-effect')} 
                children={'Delete'}
            />
                
            <a href="#!" onClick={freezedLinkDefaultBehavior} 
                {...modal[1]('modal-close btn-flat btn waves-effect')}
                children={'Close'} 
            />
        </div>
    </section>
    
    </Fragment>
    )
}

