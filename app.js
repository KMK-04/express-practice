var express = require('express')
const logger = require('morgan')
const axios = require('axios')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(express.static('public'))

app.post('/user', (req, res) => {
    console.log(req.body.name)
    res.send(req.body)
})

app.get('/', (req, res) => {
    res.sendFile('index.html')
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

app.get('/musicSearch/:term',async(req,res)=>{
const params={
    term:req.params.term,
    entity:"album",
}
const response = await axios.get(
    'https://itunes.apple.com/search',
    { params: params }
)
console.log(response.data)
res.json(response.data)
})

app.get('/likes', async (req, res) => {
    var db = firebase.firestore();
    const snapshot = await db.collection('likes').get().catch(e => console.log(e));
    var results = [];
    if (snapshot.empty) {
        console.log("No result");
        res.json([]);
        return;
    } else {
        snapshot.forEach(doc => {
            results.push(doc.data());
        });
    }
    res.json(results);
});









