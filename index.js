import express from 'express'
import favicon from 'serve-favicon'
import config from 'config'


import path from 'path'
const PORT = process.env.PORT && config.get("PORT")
const __dirname = path.resolve()


const app = express()
app.use(favicon(__dirname + '/build/favicon.ico'))


app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))


app.get('/ping', (req, res) => {
    return res.json({payload: 'pong'})
})


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})




app.listen(PORT, () => { console.log(`Server has been starten on PORT=${PORT}...`) })