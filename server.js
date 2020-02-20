const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const axios = require('axios');
var db = {};
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb+srv://Michele:Arancione6@cluster0-0jqkz.mongodb.net/test?retryWrites=true", { useUnifiedTopology: true }, (err, client) => {
    db.collection = client.db('test').collection('testdb');
    if (err) console.log(err);
});

const getData = async () => {
  try {
    return await axios.get('http://dati.comune.milano.it/dataset/ds252-economia-locali-pubblico-spettacolo/resource/e5e1c5ed-03b9-415e-9880-a2c163e4973f/view/76fa6876-f208-440f-a57c-6b3d71e52278')
  } catch (error) {
    return error
  }
}
//this is the default route and send back the content of the react build command
app.use(express.static(path.join(__dirname, 'build')));

//helmet provides a security features
app.use(helmet());
app.use(express.json());


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
      db.collection.insertOne({username: req.body.username, password: req.body.password}, (err, doc) => {
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

app.get('/geojson', (req, res) => {
  res.send(getData());
});

//specify the port were listen to
app.listen(80, () => {
    console.log('server started on port 80');
});
