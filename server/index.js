var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

server.listen(80, function () {
    console.log('The server is listening on port 80!');
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

module.exports = app;