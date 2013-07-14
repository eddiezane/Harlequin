var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , passport = require('passport')
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , ts = require('passport-twitter').Strategy 
  , opentok = require('opentok')
  , opentok_key = process.env.OPENTOK_KEY
  , opentok_secret = process.env.OPENTOK_SECRET
  , twitter_key = process.env.TWITTER_KEY
  , twitter_secret = process.env.TWITTER_SECRET
  , location = '127.0.0.1';

server.listen(8080);

var ot = new opentok.OpenTokSDK(opentok_key, opentok_secret);

app.use('/assets', express.static('assets'));
app.use(express.cookieParser());
app.use(express.session({secret: 'JFihuYI21JFH'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new ts({
  consumerKey: twitter_key,
  consumerSecret: twitter_secret,
  callbackURL: 'http://localhost:8080/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
  var user = profile;
  console.log(profile.username);
  return done(null, user);
}
));


app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

app.get('/', function(req, res) {
  var sessionId = '';
  ot.createSession(location, function(result){
    sessionId = result;
    console.log(sessionId);
    res.sendfile(__dirname + '/views/index.html');
  });
});

app.get('/lobby', ensureLoggedIn('/login'),function(req, res) {
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

app.get('/login',
    function(req, res) {
      res.send('<html><body><a href="/auth/twitter">Sign in with Twitter</a></body></html>');
    });

app.get('/logout',
    function(req, res) {
      req.logout();
      res.redirect('/');
    });
