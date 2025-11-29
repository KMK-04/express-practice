var express = require('express')
const logger = require('morgan')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.post('/user', (req, res) => {
    console.log(req.body.name)
    res.send(req.body)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user/:id', (req, res) => {
    res.send(`User id is ${req.params.id}`)
})

app.get('/user', (req, res) => {
    res.send(`User id is ${req.query.id}`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


