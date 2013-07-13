var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , opentok = require('opentok')
  , opentok_key = process.env.OPENTOK_KEY
  , opentok_secret = process.env.OPENTOK_SECRET
  , location = '127.0.0.1';

var ot = new opentok.OpenTokSDK(opentok_key, opentok_secret);

server.listen(8080);

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
  console.log(ot);
  var sessionId = '';
  ot.createSession(location, function(result){
    sessionId = result;
    console.log(sessionId);
    res.sendfile(__dirname + '/views/toktest.html');
  });
});

app.get('/lobby', function (req, res) {
  console.log(ot);
  var sessionId = '';
  ot.createSession(location, function(result){
    sessionId = result;
    console.log(sessionId);
    res.sendfile(__dirname + '/views/toktest.html');
  });
});

app.get('/room/:id', function (req, res) {
  res.sendfile(__dirname + '/views/toktest.html');
});
