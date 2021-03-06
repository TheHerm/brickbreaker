var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

server.listen(process.env.PORT || 4567, function () {
    console.log('The server is listening on port', process.env.PORT || 4567);
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

module.exports = app;