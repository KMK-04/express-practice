const express = require('express')
const logger = require('morgan')
const admin = require('firebase-admin')
const axios = require('axios')
const app = express()
const port = 3000
const firebase = require('./firebase')
const serviceAccount = require('./firebasekey.json')
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(express.static('public'))
app.use(cors({ origin : '*'}));
app.post('/user', (req, res) => {
    res.send(req.body)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

app.get('/user/:id', (req, res) => {
    res.send(`User id is ${req.params.id}`)
})
app.get('/user', (req, res) => {
    res.send(`User id is ${req.query.id}`)
})

app.get('/musicSearch/:term', async (req, res) => {
    const params = {
        term: req.params.term,
        entity: "album"
    }
    const response = await axios.get(
        'https://itunes.apple.com/search',
        { params: params }
    )
    res.json(response.data)
})

app.get('/likes', async (req, res) => {
    const db = firebase.firestore()
    const snapshot = await db.collection('likes').get().catch(e => console.log(e))
    const results = []
    if (!snapshot.empty) {
        snapshot.forEach(doc => results.push(doc.data()))
    }
    res.json(results)
})

app.post('/likes', async (req, res) => {
    const item = req.body
    const db = firebase.firestore()
    await db.collection('likes').doc(item.collectionId.toString()).set(item)
    res.json({ msg: 'OK' })
})

app.delete('/likes/:id', async (req, res) => {
    const db = firebase.firestore()
    await db.collection('likes').doc(req.params.id).delete()
    res.json({ msg: 'OK' })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
