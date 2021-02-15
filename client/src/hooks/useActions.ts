import {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as personalPageActionsCreators from '../store/actionsCreators/personalPage'


export const useActions = () => {
    const dispatch = useDispatch()
    const result = useMemo(() => bindActionCreators(personalPageActionsCreators, dispatch), [dispatch])
    return result
}