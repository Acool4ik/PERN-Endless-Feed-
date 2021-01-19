import {useState, useCallback} from 'react'


type TBody = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined
type THeaders = Headers | string[][] | Record<string, string> | undefined

type TBundler = (body: object) => string
type TUnzip = (data: Response) => Promise<object>

type TRequest = (
    url: string, method?: string, body?: TBody, headers?: THeaders, otherProps?: object
) => Promise<Response>

type TUseRequest = () => [TRequest, boolean, TUnzip, TBundler]


export const useRequest: TUseRequest = () => {
    const [loader, setLoader] = useState<boolean>(false)


    const request: TRequest = useCallback(
    async (url = '', method = 'GET', body = null , headers = {}, otherProps = {}) => {
        setLoader(true)

        try {

            const response = await fetch(url, {
                method, body, headers, ...otherProps
            })
            
            setLoader(false)
            return response

        } catch (error) {

            setLoader(false)
            throw new Error(error.message)
            
        } 

    }, []) 


    const bundler: TBundler = useCallback((body = {}) => {
        const json = JSON.stringify(body)
        return json
    }, [])


    const unzip: TUnzip = useCallback(async (data) => {
        return await data.json() || {}
    }, [])


    return [ request, loader, unzip, bundler ]
}