var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , memoryStore = express.session.MemoryStore
  , sessionStore = new memoryStore()
  , passport = require('passport')
  , passportSocketIo = require('passport.socketio')
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , ts = require('passport-twitter').Strategy
  , opentok = require('opentok')
  , opentok_key = process.env.OPENTOK_KEY
  , opentok_secret = process.env.OPENTOK_SECRET
  , twitter_key = process.env.TWITTER_KEY
  , twitter_secret = process.env.TWITTER_SECRET
  , location = '127.0.0.1'
  , port = 8080
  , host = 'localhost:8080';


// Debug
var person = 'Ryan Gosling';
var movie = 'drive';
var yturl = 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&showinfo=0';
var hint1 = false;
var hint2 = false
//

if (process.env.NODE_ENV == 'production') {
  port = 80;
  host = 'hollywood.eddiezane.me';
}

server.listen(port);

var ot = new opentok.OpenTokSDK(opentok_key, opentok_secret);

app.use('/assets', express.static('assets'));
app.use(express.cookieParser());
app.use(express.session({secret: 'JFihuYI21JFH', key: 'express.sid', store: sessionStore}));
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
  callbackURL: 'http://' + host + '/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
  var user = profile;
  console.log(profile.username);
  return done(null, user);
}
));

function getSession(myFunc) {
  ot.createSession(location, function(result) {
    myFunc(result);
  });
}

io.set('authorization', passportSocketIo.authorize({
  cookieParser: express.cookieParser,
  key:          'express.sid',
  secret:       'JFihuYI21JFH',
  store:        sessionStore,
}));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/room', ensureLoggedIn('/login'), function(req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/room/:id', ensureLoggedIn('/login'), function(req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

// Auth
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successReturnToOrRedirect: '/room', failureRedirect: '/login'
}));

app.get('/login', function(req, res) {
  res.redirect('/auth/twitter');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Socket Stuff
io.sockets.on('connection', function(socket) {
  console.log('connection!');
  // console.log(socket.handshake.user);

  socket.on('createRoom', function() {
    getSession(function(sessionId) {
      console.log("room: " + sessionId + " created");
      socket.emit('roomCreated', {roomId: sessionId});
    });
  });

  socket.on('joinRoom', function(data) {
    socket.set('roomId', data.roomId, function() {
      if (socket.join(data.roomId)) {
        console.log('room: ' + data.roomId + ' for player');
      }
    });
  });

  socket.on('message', function(data) {
    socket.get('roomId', function(err, roomId) {
      if (err) {
        console.log(err);
      } else if (roomId) {
        if (!hint1) {
          hint1 = true;
          setTimeout(function() {
            io.sockets.in(roomId).emit('message', {username: 'HINT', text: 'Main character is: ' + person});
          }, 18000);
        }
        if (!hint2) {
          hint2 = true;
          setTimeout(function() {
            io.sockets.in(roomId).emit('hint', {url: yturl});
          }, 36000);
        }
        socket.broadcast.to(roomId).emit('message', {username: socket.handshake.user.username, text: data.text});
        if (data.text.indexOf(movie) !== -1) {
          io.sockets.in(roomId).emit('message', {username: 'GAME MASTER', text: 'WINNER IS ' + socket.handshake.user.username  + '!!!!!!'})
        }
      } else {
        console.log('No roomId');
      }
    });
  });

});

