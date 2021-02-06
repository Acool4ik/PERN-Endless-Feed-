// Namespace from redux
/// <reference path="../../react-app-env.d.ts" />
import {State} from '../../react-app-env'

// Cors imports
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch, bindActionCreators} from 'redux'
import {changeProfileCreator} from '../../store/actionsCreators/actionCreator'

// Styles module for the component
import styles from '../styles/UserPage.module.css'

// Castom component
import {Post} from './Post'

// Props Interface
interface IUserPageProps extends State.IUserState {
    changeProfile: (name: string, status: string, avatar: string) => {
        type: string;
        payload: {
            name: string;
            status: string;
            avatar: string;
        }
    }
}

const UserPage = (props: any) => {
    const {uid, avatar, status, isOnline, posts, name, email, changeProfile} = props as IUserPageProps
    
    const [editor, setEditor] = useState<boolean>(false)
    const [nameState, setNameState] = useState<string>(name)
    const [statusState, setStatusState] = useState<string>(status || 'N/A')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)


    const submitProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(avatarFile);
        const formData = new FormData(e.target as HTMLFormElement)

        changeProfile('testname', 'teststatus', 'https://via.placeholder.com/160')
    }

    const changeAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files && files.length > 0) setAvatarFile(files[0])
    }

    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(elems)
    }, [])

    return (
    <section className="row padding-top-navbar">

        {/* FIRST PART */}
        <div className="col l4 m4 s12 row">

            {/*  */}
            <div className="col s12">
            <div className={styles.wrapperImageStatus} >
                <img className={styles.image} 
                    src={avatar || 'https://via.placeholder.com/150'}  
                    alt="avatar" 
                />
                
                {
                    isOnline 
                    ? <span className={styles.status} /> 
                    : <span className={styles.statusOffline} />
                }
            </div>
            </div>


            {/* NAME OF USER */}
            <h5 className={`col s12 center-align ${styles.verticalMargins} ${styles.name}`} 
                children={name}
            />


            {/* EMAIL OF USER */}
            <h6 className={`col s12 center-align ${styles.verticalMargins} ${styles.email}`} 
                children={`__${email}__`}
            />


            {/* STATUS USER --> ONLINE / OFFLINE */}
            <span className={`col s12 center-align ${styles.verticalMargins} ${styles.statusText}`}>
                - {status || 'N/A'}
            </span>
            

            {/* TOGGLE PROFILE EDITOR */}
            <button className={`col s12 btn waves-effect waves-light border N/A transparent ${styles.verticalMargins}`}
                onClick={() => setEditor(prev => !prev)}
                children={'Edit profile'}
            />

            
            {/* EDITOR FOR CHANGING INFORMATION ABOUT USER */}
            {
                editor && 
                <form className={`col s12 row ${styles.verticalMargins} ${styles.formEditor}`} 
                    onSubmit={submitProfileHandler}
                > 
                    <div className="input-field col s12">
                        <input id="name" className="validate white-text"
                            name="name"
                            value={nameState}
                            onChange={e => setNameState(e.target.value)}     
                        />
                        <label htmlFor="name" className={nameState && 'active'}>Edit name</label>
                    </div>
                    
                    <div className="input-field col s12">
                        <input id="status" className="validate white-text"
                            name="status"
                            value={statusState}
                            onChange={e => setStatusState(e.target.value)}
                        />
                        <label htmlFor="status" className={statusState && 'active'}>Edit status</label>
                    </div>

                    <div className="file-field col s12">
                        <div className="btn border">
                            <span>File</span>
                            <input type="file" accept="image/*"
                                name="avatar"
                                onChange={changeAvatarHandler}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate white-text"/>
                        </div>
                    </div>


                    <button className={`btn waves-effect waves-light border col s12 ${styles.btnSubmit}`} type="submit">
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            }


            {/* TABS SHOW USER PHOTO / VIDEO */}
            <ul className={`collection col s12 ${styles.verticalMargins}`} style={{border: 'none'}}>
                <li className={`collection-item N/A transparent ${styles.wrapperCircle}`}>
                    <span className={styles.circle}></span>
                    Photo
                </li>
                <li className={`collection-item N/A transparent ${styles.wrapperCircle}`}>
                    <span className={styles.circle}></span>
                    Video
                </li>
            </ul>
        </div>


        
        {/* SECOND PART */}
        {/* DISPLAYING POSTS OF USER */}
        <section className={`col l8 m8 s12 row ${styles.padding}`} >
            {
                posts && 
                posts.map(post => <Post key={post._id} />)
            }
            
            {
                !posts && 
                <h5 className="col s12 center-align" 
                    style={{padding: '5rem 0'}}
                    children={'You no have posts...'}
                />
            }
        </section>
        
    </section>
    )
}


const mapStateToProps = (state: State.IInitialState) => state.personalPage
const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeProfile: bindActionCreators(changeProfileCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)





