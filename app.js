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
    res.set('Access-Control-Allow-Origin', '*'); 
    res.json(req.get('Cookie'));
});
http.createServer(app).listen(3000, () => console.log("app app started"));

// CSRF endpoint
var csrf = express();
csrf.get('/', function (req, res) {
    res.send('<img src="http://localhost:3000/image.png" alt="csrf" />');
});
http.createServer(csrf).listen(3001, () => console.log("csrf endpoint started"));

// https://blog.chromium.org/2019/10/developers-get-ready-for-new.html

// SameSite is still experimental and requires to turn on features in the browser.
// res.set('Set-Cookie', ['cookie=choco', 'SameSite=None', 'Secure']);

// A solution is to use cors to prevent csrf with POST requests.
// res.set('Access-Control-Allow-Origin', 'http://localhost');

// Another solution is to use CSRF token.
// https://github.com/expressjs/csurf