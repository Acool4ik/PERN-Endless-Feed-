import {useCallback, useState} from 'react'


export enum EForward {
    BLOB_TO_URL = 'BLOB_TO_URL',
    BLOB_TO_BASE64 = 'BLOB_TO_BASE64',

    FILE_TO_URL = 'FILE_TO_URL',
    FILE_TO_BASE64 = 'FILE_TO_BASE64',

    ARRAYBUFFER_TO_URL = 'ARRAYBUFFER_TO_URL',
    ARRAYBUFFER_TO_BASE64 = 'ARRAYBUFFER_TO_BASE64'
}

export enum EBackward {
    BLOB_FROM_URL = 'BLOB_FROM_URL',
    BLOB_FROM_BASE64 = 'BLOB_FROM_BASE64',

    FILE_FROM_URL = 'FILE_FROM_URL',
    FILE_FROM_BASE64 = 'FILE_FROM_BASE64',

    ARRAYBUFFER_FROM_URL = 'ARRAYBUFFER_FROM_URL',
    ARRAYBUFFER_FROM_BASE64 = 'ARRAYBUFFER_FROM_BASE64'
}


type TDataRaw = Blob | File | ArrayBuffer
type TDataProcessed = string // url | Base64

type TTransformForward = EForward.BLOB_TO_URL | EForward.BLOB_TO_BASE64 |
                         EForward.FILE_TO_URL | EForward.FILE_TO_BASE64 |
                         EForward.ARRAYBUFFER_TO_URL | EForward.ARRAYBUFFER_TO_BASE64

type TTransformBackward = EBackward.BLOB_FROM_URL | EBackward.BLOB_FROM_BASE64 |
                          EBackward.FILE_FROM_URL | EBackward.FILE_FROM_BASE64 |
                          EBackward.ARRAYBUFFER_FROM_URL | EBackward.ARRAYBUFFER_FROM_BASE64



type TReaderForward = (data: TDataRaw, transform: TTransformForward) => Promise<TDataProcessed>
type TReaderBackward = (data: TDataProcessed, transform: TTransformBackward) => Promise<TDataRaw>

export const useReader_Image = () => {
    // state of data
    const [loading, setLoading] = useState<boolean>(false)
    const [stopped, setStopped] = useState<boolean>(false)
    const [byte, setByte] = useState<[number, number]>([0, 0])
    
    // main function forward transform  1.(blob | file | arrayBuffer) --> url | Base64
    const ReaderForward: TReaderForward = useCallback(async (data, transform) => {
        const reader = new FileReader()

        reader.onloadstart = (e) => {
            // console.log('onloadstart __ type::', e.type) 
            console.log('onloadstart __ loaded::', `${Math.floor(e.loaded / 1024)}кб`) 
            setLoading(true)
        }

        reader.onloadend = (e) => {
            // console.log('onloadend __ type::', e.type)
            console.log('onloadend __ loaded::', `${Math.floor(e.loaded / 1024)}кб`)
            console.log('onloadend __ result::', e.target);

            const Base64 = e.target?.result
            console.log('Base64', Base64)

            const img = document.createElement('img')
            document.body.append(img)
            img.src = Base64 as string

            setLoading(false)
        }

        reader.onprogress = (e) => {
            // console.log('onprogress __ type::', e.type)
            console.log('onprogress __ loaded::', `${Math.floor(e.loaded / 1024)}кб`)
        }

        // reader.onerror = (e) => {
        //     console.log('onerror::', e.target)
        // }

        // reader.onabort = (e) => {
        //     console.log('onabort::', e.target)
        // }

        reader.onload = (e) => {
            // console.log('onload __ type::', e.type)
            console.log('onload __ loaded::', `${Math.floor(e.loaded / 1024)}кб`)
        }

        console.log('DATA___::', `${Math.floor((data as File).size / 1024)}кб`)
        

        reader.readAsDataURL(data as File)

        if(transform === EForward.BLOB_TO_URL || transform === EForward.FILE_TO_URL) {}
        if(transform === EForward.BLOB_TO_BASE64 || transform === EForward.FILE_TO_BASE64) {}
        if(transform === EForward.ARRAYBUFFER_TO_URL) {}
        if(transform === EForward.ARRAYBUFFER_TO_BASE64) {}

        return 'test'
    }, [])


    // main function forward transform  2.(url | Base64) --> blob | file | arrayBuffer
    // const ReaderBackward: TReaderBackward = useCallback((url) => {
    // }, [])


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
        // 1.  (blob | file | arrayBuffer) --> url | Base64
        // 2.  (url | Base64) --> blob | file | arrayBuffer
        ReaderForward,  
        // ReaderBackward,

        // handlers for controlling state of data
        Interrupt,
        Resume,
        Close,

        // state of data
        loading,
        byte
    }
}