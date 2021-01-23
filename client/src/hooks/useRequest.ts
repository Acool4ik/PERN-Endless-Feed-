import {useState, useCallback} from 'react'
import {useLogger} from '../devHooks/useLogger'

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
    const {_error, _success} = useLogger()


    const request: TRequest = useCallback(
    async (url = '', method = 'GET', body = null , headers = {}, otherProps = {}) => {
        setLoader(true)

        try {

            const response = await fetch(url, {
                method, body, headers, ...otherProps
            })

            _success({
                data: response,
                titleData: `Response from URL=${url}`
            })

            
            setLoader(false)
            return response

        } catch (error) {
            _error({
                titleMessage: `Data is not got from Request URL=${url}`,
                message: `Message from catch: ${error}`
            })

            setLoader(false)
            throw new Error(error.message)
            
        } 

    }, [_error]) 


    const bundler: TBundler = useCallback((body = {}) => {
        const json = JSON.stringify(body)
        return json
    }, [])


    const unzip: TUnzip = useCallback(async (data) => {
        return await data.json() || {}
    }, [])


    return [ request, loader, unzip, bundler ]
}