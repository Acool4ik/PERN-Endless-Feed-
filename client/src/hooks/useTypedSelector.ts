import {useSelector, TypedUseSelectorHook} from 'react-redux'
import {TRootState} from '../store/store'

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;