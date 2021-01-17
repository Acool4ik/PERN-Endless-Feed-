import express from 'express'
import favicon from 'serve-favicon'
import config from 'config'
import path from 'path'


const PORT = process.env.PORT || config.get("PORT")
const __dirname = path.resolve()


const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/frontend*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.get('/backend*', (req, res) => {
    res.json({payload: 'bakend api'})
})


app.listen(PORT, () => { console.log(`Server has been starten on PORT=${PORT}...`) })