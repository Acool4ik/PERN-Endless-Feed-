import express from 'express'
import config from 'config'
import path from 'path'

const app = express()
const PORT = process.env.PORT ?? config.get("PORT")
const __dirname = path.resolve()


app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))


app.get('/backend/download', (req, res) => {
    res.download(path.join(__dirname, 'storage', '10.png'))
})


app.get('/backend/*', (req, res) => {
    res.status(200).json({payload: 'ok'})
})


app.get('/client*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})


app.listen(PORT, () => { console.log(`Server has been starten on PORT=${PORT}...`) })