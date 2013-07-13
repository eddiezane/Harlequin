var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , oauth = require('oauth')
  , opentok = require('opentok')
  , opentok_key = process.env.OPENTOK_KEY
  , opentok_secret = process.env.OPENTOK_SECRET
  , twitter_key = process.env.TWITTER_KEY
  , twitter_secret = process.env.TWITTER_SECRET
  , location = '127.0.0.1';

var ot = new opentok.OpenTokSDK(opentok_key, opentok_secret);

server.listen(8080);

app.use('/assets', express.static('assets'));

consumer = function() {
  return new oauth.OAuth("https://twitter.com/oauth/request_token",
                         "https://twitter.com/oauth/access_token",
                         twitter_key,
                         twitter_secret,
                         "1.0A",
                         "http://localhost:8080/sessions/callback",
                         "HMAC-SHA1");
};

app.get('/', function(req, res) {
  console.log(ot);
  var sessionId = '';
  ot.createSession(location, function(result){
    sessionId = result;
    console.log(sessionId);
    res.sendfile(__dirname + '/views/toktest.html');
  });
});

app.get('/sessions/connect', function(req, res) {
  return consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      return res.send('Error retrieving OAuth token');
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      return response.redirect("https://twitter.com/oauth/authorize?oauth_token=" + request.session.oauthRequestToken);
    }
  }
});

app.get('sessions/callback', function(req, res) {
  return consumer.getOAuthRequestToken(function(request.session.oauthRequestToken, request.session.oauthRequestTokenSecret, request.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (!error) {
      request.session.oauthAccessToken = oauthAccessToken;
      request.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      return consumer().get("http://twitter.com/account/verify_credential.json", request.session.oauthAccessToken, request.session.oauthAccessTokenSecret, function(error, data, response) {
        data = JSON.parse(data);
        return response.send("You are signed in: " + data["screen_name"]);
      });
    }
  }))
});

app.get('/lobby', function(req, res) {
  console.log(ot);
  var sessionId = '';
  ot.createSession(location, function(result){
    sessionId = result;
    console.log(sessionId);
    res.sendfile(__dirname + '/views/toktest.html');
  });
});

app.get('/room/:id', function(req, res) {
  res.sendfile(__dirname + '/views/toktest.html');
});

