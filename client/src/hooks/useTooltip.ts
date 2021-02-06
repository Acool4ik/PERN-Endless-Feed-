import { useCallback } from 'react'


export enum EPosition {
    T = 'top', 
    R = 'rigth',
    B = 'bottom', 
    L = 'left'
}

type TPosition = EPosition.T | EPosition.R | EPosition.B | EPosition.L
type TTooltip = (message: string, position?: TPosition) => object
type TUseTooltip = (className?: string, options?: object) => TTooltip
 
export const useTooltip: TUseTooltip = (className = '', options = {}) => {
   
    const tooltip: TTooltip = useCallback((
        message = '', position = EPosition.B
    ) => {

        setTimeout(() => {
            const $elems = document.querySelectorAll('.tooltipped')
            M.Tooltip.init($elems, options)
        }, 100)

        
        let classFinding = className
            .split(' ')
            .find(className => className === 'tooltipped')

        !classFinding && (className = className + 'tooltipped')

        return {
            className,
            ['data-tooltip'!]: message,
            ['data-position'!]: position
        }

    }, [])


    return tooltip
}