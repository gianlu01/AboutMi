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
//login handler
app.get('/login', (req, res) => {
  db.collection.findOne({username: req.body.username, password: req.body.password}, (err, doc)=>{
    if(err) res.send("400");
    else res.send("200");
  })
});
//register handler
app.get('/register', (req, res) => {
  db.collection.findOne({username:req.body.username, password: req.body.password}, (err, doc) => {
    if (err) res.send("400");
    else {
      db.collection.insertOne({username: req.body.username, req.body.password}, (err, doc) => {
        if (err) res.send("400");
        else res.send("200");
      });
    }
  })
})
//search local by name
app.get('/search/name', (req, res) => {
  db.collection.findOne({name: req.body.name}, (err, doc) => {
    if (err) res.send("400");
    else res.send(doc);
  });
});

//specify the port were listen to
app.listen(80, () => {
    console.log('server started on port 80');
});
