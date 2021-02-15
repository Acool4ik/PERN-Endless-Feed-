/// <reference path="../../../react-app-env.d.ts" />
import {State} from '../../../react-app-env'

import {useEffect} from 'react'

// Hooks
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../../hooks/useTypedSelector'
import {useRequest} from '../../../hooks/useRequest'
import {useMessage ,EColorMessage} from '../../../hooks/useMessage'
import {useLS} from '../../../hooks/useLS'
import {useActions} from '../../../hooks/useActions'


export const useToggleLike = () => {
    const [request, loader, unzip, bundler] = useRequest()
    const dispatch = useDispatch()
    const {posts, uid, name, avatar} = useTypedSelector(state => state.personalPage)
    const {setLoadingCreator, toggleLikeCreator} = useActions()
    const message = useMessage()
    const {get, set, remove} = useLS()

    useEffect(() => { 
        dispatch(setLoadingCreator(loader))
    }, [loader, dispatch, setLoadingCreator])


    return (id: State.TID) => {
        const findedIndex = posts?.findIndex(post => post._id = id)
        console.log(findedIndex);
        

        if(findedIndex !== -1 && findedIndex !== undefined && posts) {
            const middle = posts.find((_, index) => index === findedIndex)
            const left = posts.filter((_, index) => index < findedIndex)
            const right = posts.filter((_, index) => index > findedIndex)


            // console.log(left, middle, right, findedIndex);
            
            try {
                if(middle && middle.likes) {
                    const isExist = middle.likes.find(like => like.uid === uid)
                    console.log(isExist);
                    

                    const newMIddle: State.IPost = isExist 
                        ? {...middle, likes: [...middle.likes.filter(like => like.uid !== uid)]}
                        : {...middle, likes: [...middle.likes, {uid, name, avatar}]}
    
                    const newPosts: State.IPost[] = [...left, newMIddle, ...right] 

                    dispatch(toggleLikeCreator(newPosts))
                } else {
                    if(middle) {
                        const newMIddle: State.IPost = {...middle, likes: [{uid, name, avatar}]}
                        const newPosts: State.IPost[] = [...left, newMIddle, ...right] 
    
                        dispatch(toggleLikeCreator(newPosts))
                    }   
                }
        
            } catch(error) {
                const errorMessage = error.message || 'Something going wrong! Try Again!'
                message(errorMessage, EColorMessage.red)
            }
             
        } else {
            message('The Post does non exist!', EColorMessage.yellow)
        }
    }
}