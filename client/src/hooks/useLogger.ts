import { useCallback } from 'react'

interface IConsole {
    message?: string, 
    data?: any,
    titleMessage?: string,
    titleData?: string
}

enum ETypesLog {
    success = 'success',
    warning = 'warning',
    error = 'error'
}

type TTypesLog = ETypesLog.success | ETypesLog.warning | ETypesLog.error

type TReturnStyles = (color: string, background: string) => {
    messageStyles: string, titleStyle: string
}


export const useLogger = () => {
    const noop: (props: any) => void = useCallback((props) => {}, [])

    const returnTypeLog = useCallback(function(type: TTypesLog) {
        if(process.env.NODE_ENV === 'development') {
            const $ = console

            const returnStyles: TReturnStyles = (color, background) => {
                const messageStyles: string = `
                    padding: 2px 7px;
                    background: ${background};
                    color: ${color};
                    font-size: 13px;
                    line-height: 125%;
                    border-radius: 4px;
                `

                const titleStyle: string = `
                    ${messageStyles}
    
                    font-style: italic;
                    font-weight: bold;
                    text-decoration: underline;
                `;

                return {messageStyles, titleStyle}
            }

            if(type === ETypesLog.warning) {
                const {messageStyles, titleStyle} = returnStyles('#222', '#bada55')

                return ({message, data, titleMessage, titleData}: IConsole) => {
                    if(titleMessage) {
                        $.warn(`%c${titleMessage}:`, titleStyle)
                    }

                    if(message) {
                        $.warn(`%c${message}`, messageStyles)
                    }

                    if(titleData) {
                        $.warn(`%c${titleData}:`, titleStyle)
                    }
        
                    if(data) {
                        $.warn(data)
                    }
                    
                    (message || data) && $.log('')
                }
            }

            if(type === ETypesLog.success) {
                const {messageStyles, titleStyle} = returnStyles('#222',  'rgb(0, 205, 0)')
                
                return ({message, data, titleMessage, titleData}: IConsole) => {
                    if(titleMessage) {
                        $.log(`%c${titleMessage}:`, titleStyle)
                    }

                    if(message) {
                        $.log(`%c${message}`, messageStyles)
                    }

                    if(titleData) {
                        $.log(`%c${titleData}:`, titleStyle)
                    }
        
                    if(data) {
                        $.log(data)
                    }
                    
                    (message || data) && $.log('')
                }
            }

            if(type === ETypesLog.error) {
                const {messageStyles, titleStyle} = returnStyles('#222', 'rgb(209, 69, 27)')
          
                return ({message, data, titleMessage, titleData}: IConsole) => {
                    if(titleMessage) {
                        $.error(`%c${titleMessage}:`, titleStyle)
                    }

                    if(message) {
                        $.error(`%c${message}`, messageStyles)
                    }

                    if(titleData) {
                        $.error(`%c${titleData}:`, titleStyle)
                    }
        
                    if(data) {
                        $.error(data)
                    }
                    
                    (message || data) && $.log('')
                }
            }

            return noop
        } else {
            return noop
        }
    }, [noop])

    const returnTableLog = useCallback(() => {
        if(process.env.NODE_ENV === 'development') {
            const $ = console

            return (date: any, keyDate: string[]) => {
                $.table(date, keyDate)
            }
        } else {
            return noop
        }
    }, [noop])
   
    return {
        _success: returnTypeLog(ETypesLog.success),
        _warning: returnTypeLog(ETypesLog.warning),
        _error: returnTypeLog(ETypesLog.error),
        _table: returnTableLog()
    }
    
}