import React, {useRef, useEffect} from 'react'
import {useReader, IReader} from '../../../../../hooks/useReader'

export const Video = () => {
    const {reader} = useReader()
    const videoFileToDataUrl = reader(4)(1) as IReader[4][1]

    const source = useRef<HTMLVideoElement>(null)


    
    const changehANDLER = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const url = await videoFileToDataUrl(e.target.files[0])
        console.log(url);

         // @ts-ignore
        console.log(e.target.files[0].type);
        
        const _source = document.createElement('source')
        _source.setAttribute('src', url)

        // @ts-ignore
        _source.setAttribute('type', e.target.files[0].type)

        source.current?.append(_source)
        
        
        // @ts-ignore
        // videoFileToDataUrl(e.target.files[0], (dataUrl) => {
        //     console.log(dataUrl);
            
        //     if(source.current) 
        //     {
        //         console.log(dataUrl);
                
        //         source.current.src = dataUrl
        //     }
        // })
    }


    return (
    <>
        <video ref={source}  className="carousel-item blue white-text responsive-video" autoPlay={true} loop={true} muted={true}>
          
        </video>    
        <input onChange={changehANDLER} type="file" style={{zIndex: 1000, position: 'absolute'}} />
    </>
    )
}