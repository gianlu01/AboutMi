const express = require('express');
const app = express();
const path = require('path');
var db = {};
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb+srv://Michele:Arancione6@cluster0-0jqkz.mongodb.net/test?retryWrites=true", { useUnifiedTopology: true }, (err, client) => {
    db.collection = client.db('test').collection('testdb');
    if (err) console.log(err);
});

//this is the default route and send back the content of the react build command
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//get, example requests on /get
app.get('/get', (req, res) => {
    res.send("200");
});

//post, example request on /post
app.get('/post', (req, res) => {
    res.send("200");
});

app.get('/mongo', (req, res) => {
    db.collection.findOne({ property1: 10 }, (err, doc) => {
        if (err) console.log(err);
        else console.log(doc);
    })
})

//specify the port were listen to
app.listen(80, () => {
    console.log('server started on port 80');
});