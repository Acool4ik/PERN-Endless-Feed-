import {CHANGE_PROFILE} from '../actions/actions'


export const changeProfileCreator = (name: string, status: string, avatar: string) => {
    return {
        type: CHANGE_PROFILE,
        payload: { name, status, avatar }
    }
}

