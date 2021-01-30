const { Router } = require('express')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')

const upload = require('multer')()
const router = Router()


router.post('/emailpassword/login', upload.none(), async (req, res) => {
    const {body: {loginEmail, loginPassword}} = req

    if(loginEmail && loginPassword) {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = regExp.test(String(loginEmail).toLocaleLowerCase())
    
        if(!isEmail) {
            return res.status(400).json({message: 'Incorrect Email'})
        }
    
        try {
            const _SALT = config.get('SALT')
            
            // get from db ////// via email
            
            const dataFromDB = {
                _uid: 'ewufhiuewhfui9wehfu9ew', 
                email: loginEmail,
                password: bcrypt.hashSync(loginPassword, _SALT)
            }
            // validate not found email
            ///////////////////

            const {_uid, email, password} = dataFromDB

            const isPassword = await bcrypt.compare(loginPassword, password)
        
            if(!isPassword) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const dataToRefresh = config.get('REFRESH')
            const JWTSecretKey = config.get('JWTSecretKey')
            
            const jwt = JWT.sign(dataFromDB, JWTSecretKey, {expiresIn: '12h'})
            const refresh = JWT.sign({dataToRefresh}, JWTSecretKey, {expiresIn: '7d'})

            return res.status(200).json({message: 'You are log in system!', 
                payload: {jwt, refresh, uid: _uid}
            })
        } catch(error) {
            const errorMessage = error.message || 'Something going wrong...'
            return res.status(400).json({message: errorMessage})
        }
    } else {
        return res.status(400).json({message: 'Not enough data for authorization'})
    }
    

})


module.exports = router







