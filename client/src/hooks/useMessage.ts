import { useCallback } from 'react'


export enum EColorMessage {
    yellow = 'lime-text text-accent-3',
    green = 'teal-text text-accent-3',
    red = 'deep-orange-text text-accent-4'
}


type TColors = EColorMessage.green | EColorMessage.red | EColorMessage.yellow
type TTemplate = (m: string, c?: TColors) => string
type TUseMessage = (template?: TTemplate) => (message: string, color?: TColors, options?: object) => void


export const useMessage: TUseMessage = (
    template = (m, c) => `<strong class=${c}>${m}</strong>`
) => {

    const message = useCallback((
        message = 'Success', 
        color = EColorMessage.green,
        options = {}
    ) => {
        M.toast({
            html: template(message, color), ...options
        })
    }, [template])

    return message
}
