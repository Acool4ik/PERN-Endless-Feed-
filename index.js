import express from 'express'
import favicon from 'serve-favicon'
import config from 'config'
import path from 'path'


const PORT = process.env.PORT ? process.env.PORT : config.get("PORT_HTTP")
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development"
const __dirname = path.resolve()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'client', 'build')))


// backend API 
app.get('/backend*', (req, res) => {
    res.json({payload: 'bakend api'})
})


// send static file for SPA App
app.get('/', (_, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) })
app.get('/frontend*', (_, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) })


app.listen(PORT, () => { 
    console.log(`Server has been starten on PORT=${PORT}...`)
    console.log(`Current mode NODE_ENV=${NODE_ENV}`)
})