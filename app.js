var http = require('http');
var express = require('express');
var text2png = require('text2png');

// Cookie endpoint
var app = express();
app.get('/', function (req, res) {
    res.set('Set-Cookie', ['cookie=choco']);
    res.send(req.get('Cookie'));
});
app.get('/image.png', function (req, res) {
    res.contentType('image/png');
    res.send(text2png(req.get('Cookie')));
});
app.post('/post', function (req, res) {
    res.json(req.get('Cookie'));
});
http.createServer(app).listen(3000, () => console.log("app app started"));

// CSRF endpoint
var csrf = express();
csrf.get('/', function (req, res) {
    console.log(req.get('Cookie'))
    res.send('<img src="http://localhost:3000/image.png" alt="csrf" />');
});
http.createServer(csrf).listen(3001, () => console.log("csrf endpoint started"));


