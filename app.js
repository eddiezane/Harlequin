var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});
