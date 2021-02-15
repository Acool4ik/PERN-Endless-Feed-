// Core imports
import {useEffect, useMemo} from 'react'
import {useDispatch} from 'react-redux'

// Actions for personal page
import * as Actions from '../../actions/personalPage'

// Castom hooks
import {useRequest} from '../../../hooks/useRequest'
import {useMessage ,EColorMessage} from '../../../hooks/useMessage'
import {useReader, IReader} from '../../../hooks/useReader'
import {useLS} from '../../../hooks/useLS'
import {useTypedSelector} from '../../../hooks/useTypedSelector'
import {useActions} from '../../../hooks/useActions'


export const useChangeProfile = () => {
    const [request, loader, unzip, bundler] = useRequest()
    const message = useMessage()
    const {reader, loadingReader, byte} = useReader()
    const {get, set, remove} = useLS()
    const {name, status, avatar} = useTypedSelector(state => state.personalPage)
    const dispatch = useDispatch()
    const {setLoadingCreator} = useActions()

    const defaultState: Actions.IChangeProfile = useMemo(() => ({
        type: Actions.EActionsPersonalData.CHANGE_PROFILE,
        payload: { name, status, avatar}
    }), [name, status, avatar])

    useEffect(() => {
        dispatch(setLoadingCreator(loader))
    }, [loader, dispatch, setLoadingCreator])

    useEffect(() => {
        dispatch(setLoadingCreator(loadingReader))
    }, [loadingReader, dispatch, setLoadingCreator])


    return (newName?: string, newStatus?: string, newAvatar?: File) => {
        
        try {
            if(newName && newName.length < 6) {
                message('Name must be more then 6 characters!', EColorMessage.yellow)
                return defaultState
            }
    
            if(newStatus && newStatus.length > 150) {
                message('Status must be no more then 150 characters!', EColorMessage.yellow)
                return defaultState
            }
    
            if(newAvatar) {
                const FILE_TO_DATA_URL = reader(5)(1) as IReader[5][1]
                FILE_TO_DATA_URL(newAvatar, (dataURL, error) => {
                    const newState: Actions.IChangeProfile = {
                        type: Actions.EActionsPersonalData.CHANGE_PROFILE,
                        payload: {
                            name: newName ? newName : name,
                            status: newStatus ? newStatus : status,
                            avatar: dataURL ? dataURL : avatar
                        }
                    }
    
                    dispatch(newState)
                })
            } else {
                const newState: Actions.IChangeProfile = {
                    type: Actions.EActionsPersonalData.CHANGE_PROFILE,
                    payload: {
                        name: newName ? newName : name,
                        status: newStatus ? newStatus : status,
                        avatar
                    }
                }
    
                dispatch(newState)
            }
            
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong! Try again!'
            message(errorMessage, EColorMessage.red)
            return defaultState
        }
    
        return defaultState
    }
}