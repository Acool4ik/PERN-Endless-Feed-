import React, {useContext, useEffect, Fragment} from 'react'
import {NavLink, Link, useLocation, useHistory} from 'react-router-dom'
import {AuthEmailPasswordContext} from '../../context/AuthEmailPassword/AuthEmailPasswordContext'
import styles from '../styles/Navbar.module.css'


export const Navbar = () => {
    const {LogOut} = useContext(AuthEmailPasswordContext)
    const location = useLocation()
    const history = useHistory()
    const uid = 1


    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav')
        M.Sidenav.init(elems)
        history.push(`/frontend/page/${uid || 1}`)
    }, [history, uid])


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
                <NavLink to="/frontend/strips"><i className="material-icons">forum</i></NavLink>
            </li>

            <li>
                <NavLink to={`/frontend/page/${uid}`}><i className="material-icons">home</i></NavLink>
            </li>

            <li>
                <a href={`${location.pathname}`}><i className="material-icons">refresh</i></a>
            </li>

            <li onClick={() => LogOut()} >
                <Link to="/"><i className="material-icons">delete</i></Link>
            </li>
        </ul>
    </div>
    </nav>


    <ul className="sidenav" id="mobile-demo">
        <li>
            <NavLink to="/frontend/strips"><i className="material-icons">forum</i>Strips Page</NavLink>
        </li>

        <li>
            <NavLink to={`/frontend/page/${uid || 1}`}><i className="material-icons">home</i>Home Page</NavLink>
        </li>

        <li>
            <a href={`${location.pathname}`}><i className="material-icons">refresh</i>Refresh the page</a>
        </li>

        <li onClick={() => LogOut()} >
            <Link to="/"><i className="material-icons">delete</i>Exit</Link>
        </li>
    </ul>
    </Fragment>
    )
}

