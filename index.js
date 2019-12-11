const express = require('express');
const app = express();
const path = require('path');

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
app.get('/post', (req, rest) => {
    res.send("200");
});

//specify the port were listen to
app.listen(80, () => {
    console.log('server started on port 80');
});