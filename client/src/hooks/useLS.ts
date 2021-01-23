import { useCallback } from 'react'
import { useLogger } from '../devHooks/useLogger'

type TPrimitive = string | number | boolean
type TGet = (path: string) => object | TPrimitive | undefined
type TSet = (path: string, data: object | TPrimitive) => boolean


export const useLS = () => {
    const {_success, _error, _warning } = useLogger()

    const get: TGet = useCallback((path) => {
        const pathArray = path.split('/')

        const rawDate = window.localStorage.getItem(pathArray[0])

        if(rawDate === null) {
            _error({
                message: 'Root of data in LS is absent', 
                titleMessage: `Key: ${pathArray[0]}`
            })
            return undefined
        }

        try {
            let currentStepDate = JSON.parse(rawDate)
            for(let i = 1; i < pathArray.length; i++) {
                currentStepDate = currentStepDate[pathArray[i]]
            }
            
            if(currentStepDate) {
                _success({
                    message: 'Data from LS is got successfully', 
                    titleMessage: `Path: ...${pathArray[pathArray.length - 1]}`
                })
                return currentStepDate
            } else {
                _error({
                    message: 'This key in data of LS is not exist', 
                    titleMessage: `Path: ...${pathArray[pathArray.length - 1]}`
                })
                return undefined
            }

        } catch(error) {
            _error({
                titleMessage: 'Data dont get from LS',
                message: `Catch message: ${error.message}`
            })
            return undefined
        }

    }, [_error, _success])

    const set: TSet = useCallback((path, data) => {
        const pathArray = path.split('/')

        let rootOfDate = get(pathArray[0])

        if(rootOfDate === undefined) {
            if(pathArray.length === 1) {
                _success({
                    message: 'New data set in root of LS',
                    titleMessage: `key: ${pathArray[0]}`
                })
                JSON_TO_LS(data)
                return true
            } else {
                _error({
                    message: 'Wrong Path for set data in LS'
                })
                return false
            }
        }

        if(rootOfDate && pathArray.length === 1) {
            _success({
                message: 'Data set in LS',
                titleMessage: `Key: ${pathArray[0]}`
            })
            JSON_TO_LS(data)
            return true
        }

        function JSON_TO_LS(_data: object | TPrimitive): void {
            const dataToLS = JSON.stringify(_data)
            window.localStorage.setItem(pathArray[0], dataToLS)
        } 

        try {
            const _length = pathArray.length - 1
            let state = {} as object

            if(typeof rootOfDate !== 'object' && !_length) {
                _success({
                    message: 'Data set in LS',
                    titleMessage: `Key: ${pathArray[0]}`
                })
                JSON_TO_LS(data)
                return true
            }

            if(typeof rootOfDate === 'object') {
                _success({
                    message: 'Data set in LS',
                    titleMessage: `Path: ...${pathArray[pathArray.length - 1]}`
                })
                state = setState(_length, rootOfDate, data)
                JSON_TO_LS(state)

                return true
            } 
               
            function setState(length: number, immutable: any, setUpDate: object | TPrimitive): any {
                let currentStepDate = {...immutable}

                for(let i = 1; i < length; i++) {
                    const isNumber = Number(pathArray[i])
                    
                    if(typeof isNumber === 'number' && !isNaN(isNumber)) {
                        currentStepDate = currentStepDate[isNumber]
                    } else {
                        currentStepDate = currentStepDate[pathArray[i]]
                    }
                }

                currentStepDate[pathArray[length]] = setUpDate
                length--

                if(length === 0) {
                    return {...currentStepDate}
                } else {
                    return setState(length, rootOfDate, {...currentStepDate})
                }
            }

            return false
        } catch(error) {
            _error({
                titleMessage: 'Data dont set in LS',
                message: `Catch message: ${error.message}`
            })
            return false
        }
    }, [get, _error, _success])

    const remove = useCallback((path) => {
        const pathArray = path.split('/') 
        const _length = pathArray.length

        if(_length === 1) {
            _warning({
                message: 'Data have been deleted from LS',
                titleMessage: `Key: ${pathArray[0]}`
            })
            window.localStorage.removeItem(pathArray[0])
            return true
        }

        const pathForGetData = pathArray
            .filter((_: any, i: number) => i !== _length - 1)
            .join('/')

        const data = get(pathForGetData) as any
        
        if(data === undefined) {
            _error({
                message: 'Data is not deleted from LS'
            })
            return false
        }

        const isDeleted = delete data[pathArray[_length - 1]]
        
        if(isDeleted) {
            _warning({
                message: 'Data have been deleted from LS',
                titleMessage: `Path: ${pathArray[pathArray.length - 1]}`
            })
            set(pathForGetData, data)
            return true
        } else {
            _error({
                message: 'Data is not deleted from LS'
            })
            return false
        }

    }, [get, set, _warning, _error])
    
    return { get, set, remove }
}