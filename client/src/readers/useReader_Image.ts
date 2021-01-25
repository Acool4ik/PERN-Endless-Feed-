import {useCallback, useState} from 'react'


type TDataRaw = Blob | File | ArrayBuffer
type TDataProcessed = string // url

type TReaderForward = (data: TDataRaw) => void
type TReaderBackward = (data: TDataProcessed) => void


export const useReader_Image = () => {
    // state of data
    const [loading, setLoading] = useState<boolean>(false)
    const [stopped, setStopped] = useState<boolean>(false)
    const [byte, setByte] = useState<[number, number]>([0, 0])
    

    // main function forward transform  1.(blob | file | arrayBuffer) --(transform)--> url
    const readerForward: TReaderForward = useCallback((data) => {
        const reader = new FileReader()

        reader.onloadstart = (e) => {
            console.log('onloadstart __ loaded::', `${Math.floor(e.loaded / 1024)}кб`) 
            setLoading(true)
        }

        reader.onloadend = (e) => {
            console.log('onloadend __ loaded::', `${Math.floor(e.loaded / 1024)}кб`)
            console.log('onloadend __ result::', e.target);

            const Base64_URL = e.target?.result

            const img = document.createElement('img')
            document.body.append(img)
            img.src = Base64_URL as string

            setLoading(false)
        }

        reader.onprogress = (e) => {
            console.log('onprogress __ loaded::', `${Math.floor(e.loaded / 1024)}кб`)
        }

        reader.onerror = (e) => { console.log('onerror::', e.target) }
        reader.onabort = (e) => { console.log('onabort::', e.target) }

        reader.onload = (e) => {
            console.log('onload __ loaded::', `${Math.floor(e.loaded / 1024)}кб`)

            // @ts-ignore
            window.$ = { URL_IMAGE: e.target?.result }

            setLoading(true)
        }

        console.log('DATA___::', `${Math.floor((data as File).size / 1024)}кб`)
        

        reader.readAsDataURL(data as File)

    }, [])




    // main function forward transform  2.(url) --(transform)--> blob | file | arrayBuffer
    const readerBackward: TReaderBackward = useCallback((url) => {}, [])

    // handlers for controlling state of data
    const Interrupt = useCallback(() => setStopped(true), [])
    const Resume = useCallback(() => setStopped(false), [])
    const Close = useCallback(() => {
        setLoading(false)
        setStopped(false)
        setByte([0, 0])
    }, [])

    return {
        // main fanction
        // 1.  (blob | file | arrayBuffer) --(transform)--> url
        // 2.  (url) --(transform)--> blob | file | arrayBuffer
        readerForward,  
        readerBackward,

        // handlers for controlling state of data
        Interrupt,
        Resume,
        Close,

        // state of data
        loading,
        byte
    }
}