import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

// Castom hooks
import {useRequest} from '../../../hooks/useRequest'
import {useMessage ,EColorMessage} from '../../../hooks/useMessage'
import {useLS} from '../../../hooks/useLS'
import {useActions} from '../../../hooks/useActions'

export const useDeleteProfile = () => {
    const [request, loader, unzip, bundler] = useRequest()
    const message = useMessage()
    const {deleteProfileCreator, setLoadingCreator} = useActions()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoadingCreator(loader))
    }, [loader, setLoadingCreator, dispatch])

    
    return () => {
        try {
            dispatch(deleteProfileCreator())
            
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong! Try again!'
            message(errorMessage, EColorMessage.red)
        }
    }
}