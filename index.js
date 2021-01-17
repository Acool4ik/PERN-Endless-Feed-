import express from 'express'
import favicon from 'serve-favicon'
import config from 'config'
import path from 'path'


const PORT = process.env.PORT || config.get("PORT")
const __dirname = path.resolve()


const app = express()


app.get('/', (req, res) => {
    res.json({payload: 'home page'})
})


app.get('/about', (req, res) => {
    res.json({payload: 'about page'})
})



app.listen(PORT, () => { console.log(`Server has been starten on PORT=${PORT}...`) })