import { useCallback } from 'react'


export const useModal = (options = {}) => {

    const initModal = useCallback(() => {
        setTimeout(() => {
            const elems = document.querySelectorAll('.modal')
            M.Modal.init(elems, options)
        }, 100)
    }, [options])
       
    const _id = randomKeyGenerator()


    return [

        (classModal = '') => {
            initModal()

            return {
                id: _id,
                className: classModal + "modal",
            }
        },

        (classBtn = '') => {
            initModal()

            return {
                ['data-target'!]: _id,
                className: classBtn + "modal-trigger"
            }
        }

    ]

    
}


export function randomKeyGenerator(): string {
    const letter: string = 'hmowpqyrgcnzgvwtft'
    let wordID: string = ''

    for (let i = 0; i < letter.length; i++) {
        wordID += letter.charAt(Math.floor(Math.random() * letter.length))
    }

    const randomKey = wordID.substring(0, 6) + '-' + wordID.substring(6, 12) + '-' + wordID.substring(12, 18)


    return randomKey.toUpperCase()
}


