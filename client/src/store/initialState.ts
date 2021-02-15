/// <reference path="../react-app-env.d.ts" />
import {State} from '../react-app-env'


export const initialState: State.IInitialState  = {
    personalPage: {
        uid: 'uigj-rhge-jjgi-45hj',
        email: 'go@go.ru',
        name: 'Acool4ik',
        loading: false,
        isOnline: true,
        status: 'Status text danila jopaStatus text danila jopaStatus text danila jopa',
        avatar: 'https://via.placeholder.com/150',
        posts: returnPost()
    },

    strips: returnPost()
}


function returnPost() {
    return [
        {
            _id: 143,
            photos: [
                {
                    _id: 12,
                    url: 'https://via.placeholder.com/300x200'
                },
                {
                    _id: 2,
                    url: 'https://via.placeholder.com/300x200'
                }
            ],
            video: {
                url: 'https://via.placeholder.com/300x200',
                type: 'video/mp4'
            },
            description: 'Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.',
            comments: [
                {
                    uid: 'uigj-rhge-jjgi-45hj',
                    name: 'Alex363',
                    avatar: 'https://via.placeholder.com/100',
                    comment: 'Lorem ipsum dolor sit amet.  Jopa danila'
                }
            ],
            likes: [
                {
                    uid: 'uigj-rhge-jjgi-45hj',
                    name: 'Alex363',
                    avatar: 'https://via.placeholder.com/100'
                }
            ] 
        },
        {
            _id: 1654,
            photos: [
                {
                    _id: 1,
                    url: 'https://via.placeholder.com/300x200'
                }
            ],
            description: 'Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet.',
            comments: [
                {
                    uid: 'uigj-rhge-jjgi-45hj',
                    name: 'Alex363',
                    avatar: 'https://via.placeholder.com/100',
                    comment: 'Lorem ipsum dolor sit amet.  Jopa danila'
                },
                {
                    uid: 'uigj-rhge-jjgi-45hj',
                    name: 'Alex363',
                    avatar: 'https://via.placeholder.com/100',
                    comment: 'Lorem ipsum dolor sit amet.  Jopa danila'
                },
                {
                    uid: 'uigj-rhge-jjgi-45hj',
                    name: 'Alex363',
                    avatar: 'https://via.placeholder.com/100',
                    comment: 'Lorem ipsum dolor sit amet.  Jopa danila'
                }
            ],
            likes: [
                {
                    uid: 'uigj-rhge-jjgi-45hj',
                    name: 'Acol4ik',
                    avatar: 'https://via.placeholder.com/100'
                }
            ] 
        }
    ]
}
