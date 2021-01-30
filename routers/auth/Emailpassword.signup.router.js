const { Router } = require('express')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const {v4: uuidv4} = require('uuid')


const upload = require('multer')()
const router = Router()


router.post('/emailpassword/signup', upload.none(), (req, res) => {
    const {body: {signupEmail, signupPassword, signupRepeatPassword}} = req

    if(signupEmail && signupPassword && signupRepeatPassword) {
        const isPassword = signupPassword === signupRepeatPassword
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = regExp.test(String(signupEmail).toLocaleLowerCase())
 
        if(!isPassword) {
            return res.status(400).json({message: 'Password do not match'})
        }

        if(!isEmail) {
            return res.status(400).json({message: 'Incorrect Email'})
        }
        
        try {
            const _SALT = config.get('SALT')
            const _hashPassword = bcrypt.hashSync(signupPassword, _SALT)
            const _UID = uuidv4(25)

            const dataToDB = {
                _uid: _UID,
                email: signupEmail,
                password: _hashPassword
            }

            // // // // // // //
            // here send data to DB //
            //console.log('DataToDB:_', dataToDB)
            // // // // // // //

            const dataToRefresh = config.get('REFRESH')
            const JWTSecretKey = config.get('JWTSecretKey')

            const jwt = JWT.sign(dataToDB, JWTSecretKey, {expiresIn: '12h'})
            const refresh = JWT.sign({dataToRefresh}, JWTSecretKey, {expiresIn: '7d'})

            return res.status(201).json({message: 'User have beed created',
                payload: {jwt, refresh, uid: _UID}
            })
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong...'
            return res.status(400).json({message: errorMessage})
        }

    } else {
        return res.status(400).json({message: 'Not enough data for registration'})
    }
})


module.exports = router







