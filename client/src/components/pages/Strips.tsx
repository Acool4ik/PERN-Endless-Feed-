import React from 'react'
import {Post} from './post/Post'
import {useTypedSelector} from '../../hooks/useTypedSelector'

export const Strips = () => {
    const strips = useTypedSelector(state => state.strips)

    return (
    <section className="row padding-top-navbar">

        {
            strips.map(post => <Post key={post._id} {...post} />)
        }
        
    </section>
    )
}