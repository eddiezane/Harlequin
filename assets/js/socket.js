var mock_socket = {
  on: function(){},
  emit: function(msg, data) {
    console.log('-- ' + msg + ' --');
    console.log(data);
  }
};

//socket = mock_socket;
socket = io.connect('http://localhost:8080');

//socket.on('broadcastMessage', function(data) { });
//socket.on('newRound', function(data) { });
//socket.on('roundDone', function(data) { });
//socket.on('roundStarting', function(data) { });
//socket.on('roundStart', function(data) { });
//socket.emit('my other event', { my: 'data' });
