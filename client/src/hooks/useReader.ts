import {useCallback, useState} from 'react'


export interface IReader {
    1: {
        1: null, 
        2: (blob: Blob) => Promise<File>, 
        3: (buffer: ArrayBuffer, mimeType: string) => Promise<File>,
        4: (data: string) => Promise<File>,
        5: (data: string) => Promise<File>
    },

    2: {
        1: (file: File) => Promise<Blob>, 
        2: null, 
        3: (buffer: ArrayBuffer, mimeType: string) => Promise<Blob>,
        4: (data: string) => Promise<Blob>,
        5: (data: string) => Promise<Blob>
    },

    3: {
        1: (data: File | Blob) => Promise<ArrayBuffer>, 
        2: (data: File | Blob) => Promise<ArrayBuffer>, 
        3: null,
        4: (data: string) => Promise<ArrayBuffer>,
        5: (data: string) => Promise<ArrayBuffer>
    },

    4: {
        1: (data: File | Blob) => Promise<string>, 
        2: (data: File | Blob) => Promise<string>, 
        3: (buffer: ArrayBuffer, mimeType: string) => Promise<string>,
        4: null,
        5: (DataURL: string) => Promise<string>
    },

    5: {
        1: (data: File | Blob, callback: (DataURL: string, error?: Error | undefined) => void) => Promise<void>, 
        2: (data: File | Blob, callback: (DataURL: string, error?: Error | undefined) => void) => Promise<void>, 
        3: (buffer: ArrayBuffer, mimeType: string, callback: (DataURL: string, error?: Error | undefined) => void) => Promise<void>,
        4: (url: string, callback: (DataURL: string, error?: Error | undefined) => void) => Promise<void>,
        5: null
    }
}


export const useReader = () => {
    // state of data
    const [loadingReader, setLoadingReader] = useState<boolean>(false)
    const [byte, setByte] = useState<[number, number]>([0, 0])
    

    
    const reader = useCallback((J: number) => {
        const arrayColumn_1 = [
            null, BLOB_TO_FILE, ARRAYBUFFER_TO_FILE, URL_OR_DataURL_TO_FILE, URL_OR_DataURL_TO_FILE
        ]
    
        const arrayColumn_2 = [
            FILE_TO_BLOB, null, ARRAYBUFFER_TO_BLOB, URL_OR_DataURL_TO_BLOB, URL_OR_DataURL_TO_BLOB
        ]
    
        const arrayColumn_3 = [
            FILE_OR_BLOB_TO_ARRAYBUFFER, FILE_OR_BLOB_TO_ARRAYBUFFER, null, URL_OR_DataURL_TO_ARRAYBUFFER, URL_OR_DataURL_TO_ARRAYBUFFER
        ]
    
        const arrayColumn_4 = [
            FILE_OR_BLOB_TO_URL, FILE_OR_BLOB_TO_URL, ARRAYBUFFER_TO_URL, null, DataURL_TO_URL
        ]
    
        const arrayColumn_5 = [
            FILE_OR_BLOB_TO_DataURL, FILE_OR_BLOB_TO_DataURL, ARRAYBUFFER_TO_DataURL, URL_TO_DataURL, null
        ]
    
        const arrayColumnContainer = [
            arrayColumn_1,
            arrayColumn_2,
            arrayColumn_3,
            arrayColumn_4,
            arrayColumn_5
        ]
    
        return (I: number) => {
            if(I === J) { return null }
            if(I > 5 || I < 1 || J > 5 || J < 1) { return null }
            return arrayColumnContainer[J - 1][I - 1]
        }
    }, [])


    ///////////////////////////
    ////  BLOB & FILE = X  ////
    ///////////////////////////
    
    // sync (f_1,1 - f_1,5) && (f_2,1 - f_2,5)
    async function BLOB_TO_FILE(blob: Blob): Promise<File> {
        const dictionary = 'qwertyuiopasdfgh' // 16 letters
        let nameRandom: string = ''
    
        for (let i = 0; i < dictionary.length; i++) {
            nameRandom += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
        }
    
        const file = new File([blob], nameRandom, { 
            type: blob.type,
            lastModified: Date.now()
        })
    
        return file
    }
    
    async function FILE_TO_BLOB(file: File): Promise<Blob> {
        const blob = new Blob([file], { type: file.type })
        return blob
    }
    
    async function FILE_OR_BLOB_TO_ARRAYBUFFER(data: File | Blob): Promise<ArrayBuffer> {
        return await data.arrayBuffer()
    }
    
    async function FILE_OR_BLOB_TO_URL(data: File | Blob): Promise<string> {
        return URL.createObjectURL(data)
    }
    
    // async --> callback is necessarily
    async function FILE_OR_BLOB_TO_DataURL(
        data: File | Blob, 
        callback: (DataURL: string, error?: Error) => void
    
    ): Promise<void> {
        setLoadingReader(true)
        const reader = new FileReader()
        const dataSize = data.size

        reader.onloadstart = (e) => setByte([e.loaded, dataSize])
        reader.onprogress = (e) => setByte([e.loaded, dataSize])

        reader.onloadend = () => {
            setLoadingReader(false)
            setByte([0, 0])
        }
    
        try {
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const dataURL = e.target?.result as string
                if(dataURL) {
                    setByte([e.loaded, dataSize])
                    await callback(dataURL)
                }
            }
        
            reader.readAsDataURL(data)
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong...'
            setLoadingReader(false)
            setByte([0, 0])
            await callback('', new Error(errorMessage))
        }
    }
    
    
    ///////////////////////////
    ////  ARRAYBUFFER = X  ////  
    ///////////////////////////
    
    // sync (f_3,1 - f_3,5)
    async function ARRAYBUFFER_TO_FILE(buffer: ArrayBuffer, mimeType: string): Promise<File> {
        const dictionary = 'qwertyuiopasdfgh' // 16 letters
        let nameRandom: string = ''
    
        for (let i = 0; i < dictionary.length; i++) {
            nameRandom += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
        }
    
        const uint8Array = new Uint8Array(buffer)
        const file = new File([uint8Array], nameRandom, { type: mimeType })
    
        return file
    }
    
    async function ARRAYBUFFER_TO_BLOB(buffer: ArrayBuffer, mimeType: string): Promise<Blob> {
        const uint8Array = new Uint8Array(buffer)
        const blob = new Blob([uint8Array], { type: mimeType })
    
        return blob
    }
    
    async function ARRAYBUFFER_TO_URL(buffer: ArrayBuffer, mimeType: string): Promise<string> {
        const blob = new Blob([buffer], { type: mimeType })
        const _URL = URL.createObjectURL(blob)
    
        return _URL
    }
    
    // async --> callback is necessarily
    async function ARRAYBUFFER_TO_DataURL(
        buffer: ArrayBuffer, 
        mimeType: string, 
        callback: (DataURL: string, error?: Error) => void
    
    ): Promise<void> {
        setLoadingReader(true)
        const reader = new FileReader()
        const blob = new Blob([buffer], { type: mimeType })
        const dataSize = blob.size

        reader.onloadstart = (e) => setByte([e.loaded, dataSize])
        reader.onprogress = (e) => setByte([e.loaded, dataSize])

        reader.onloadend = () => {
            setLoadingReader(false)
            setByte([0, 0])
        }
    
        try {
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const dataURL = e.target?.result as string
                if(dataURL) {
                    setByte([e.loaded, dataSize])
                    await callback(dataURL)
                }
            } 
    
            reader.readAsDataURL(blob)
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong...'
            setLoadingReader(false)
            setByte([0, 0])
            await callback('', new Error(errorMessage))
        }
    }


    /////////////////////////////
    ////  URL & DataURL = X  ////
    /////////////////////////////
    
    // sync (f_4,1 - f_4,5) && (f_5,1 - f_5,5)
    async function URL_OR_DataURL_TO_FILE(data: string): Promise<File> {
        const response = await fetch(data)
        const blob = await response.blob()
    
        const dictionary = 'qwertyuiopasdfgh' // 16 letters
        let nameRandom: string = ''
    
        for (let i = 0; i < dictionary.length; i++) {
            nameRandom += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
        }
    
        return new File([blob], nameRandom, {type: blob.type})
    }
    
    async function URL_OR_DataURL_TO_BLOB(data: string): Promise<Blob> {
        const response = await fetch(data)
        return await response.blob()
    }
    
    async function URL_OR_DataURL_TO_ARRAYBUFFER(data: string): Promise<ArrayBuffer> {
        const response = await fetch(data)
        return await response.arrayBuffer()
    }
    
    async function DataURL_TO_URL(DataURL: string): Promise<string> {
        const response = await fetch(DataURL)
        const blob = await response.blob()
    
        return URL.createObjectURL(blob)
    }
    
    // async --> callback is necessarily
    async function URL_TO_DataURL(url: string, callback: (DataURL: string, error?: Error) => void): Promise<void> {
        const reader = new FileReader()
    
        try {
            setLoadingReader(true)
            const response = await fetch(url)
            const blob = await response.blob()
            const dataSize = blob.size

            reader.onloadstart = (e) => setByte([e.loaded, dataSize])
            reader.onprogress = (e) => setByte([e.loaded, dataSize])

            reader.onloadend = () => {
                setLoadingReader(false)
                setByte([0, 0])
            }
            
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const dataURL = e.target?.result as string
                if(dataURL) {
                    setByte([e.loaded, dataSize])
                    await callback(dataURL)
                }
            } 
    
            reader.readAsDataURL(blob)
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong...'
            setLoadingReader(false)
            setByte([0, 0])
            await callback('', new Error(errorMessage))   
        }
    }
        
        
    return {
        // reader of data
        reader,

        // state of data
        loadingReader,
        byte
    }
}