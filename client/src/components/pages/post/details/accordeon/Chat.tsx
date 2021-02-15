import React from 'react'
import styles from '../../../../styles/Chat.module.css'

export const Chat = () => {



    return (
    <section className={`row ${styles.mBottom0}`} >
        <div className="col s12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, itaque officia? Quasi impedit esse velit odit voluptatem illum magnam ex id, quo ullam, aliquid ab architecto perferendis nemo a fugiat.
        </div>
    
        <div className="col s12">
            <div className={`row ${styles.mBottom0}`}>
                <div className={`input-field col s12 ${styles.textareaWrapper}`}>
                    <textarea id="textarea1" className="materialize-textarea white-text"></textarea>
                    <label htmlFor="textarea1">Textarea</label>
                </div>
            </div>
        </div>
    </section>
    )
}