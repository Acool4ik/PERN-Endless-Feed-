import React, {useEffect} from 'react'
import {Video} from './Video'

export const Slider = () => {
    useEffect(() => {
        const elems = document.querySelectorAll('.carousel')
        M.Carousel.init(elems, {fullWidth: true, indicators: true})
    }, [])


    return (
    <section className="card-image">
    <div className="carousel carousel-slider center">
        <div className="carousel-item red white-text">
            <h2>First Panel</h2>
            <p className="white-text">This is your first panel</p>
        </div>
        <div className="carousel-item amber white-text">
            <h2>Second Panel</h2>
            <p className="white-text">This is your second panel</p>
        </div>
        <div className="carousel-item green white-text" >
            <h2>Third Panel</h2>
            <p className="white-text">This is your third panel</p>
        </div>
        <Video />
    </div>
    </section>
    )
}