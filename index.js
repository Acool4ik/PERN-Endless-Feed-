const express = require('express') 
const favicon = require('serve-favicon') 
const config = require('config') 
const path = require('path')

const PORT = process.env.PORT ? process.env.PORT : config.get("PORT_HTTP")
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
// app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')))
// app.use(express.static(path.join(__dirname, 'client', 'build')))



// backend Auth Email and Password API 
app.use('/backend/auth', require('./routers/auth/Emailpassword.login.router'))
app.use('/backend/auth', require('./routers/auth/Emailpassword.signup.router'))



// send static file for SPA App
// app.get('/', (_, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) })
// app.get('/frontend*', (_, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) })


app.listen(PORT, () => { 
    console.log(`Server has been starten on PORT=${PORT}...`)
    console.log(`Current mode NODE_ENV=${NODE_ENV}`)
})
