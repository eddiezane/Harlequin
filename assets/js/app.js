//var socket = io.connect('http://localhost');
//socket.on('broadcastMessage', function(data) { });
//socket.on('newRound', function(data) { });
//socket.on('roundDone', function(data) { });
//socket.on('roundStarting', function(data) { });
//socket.on('roundStart', function(data) { });
//socket.emit('my other event', { my: 'data' });

//var socket    = io.connect('http://localhost:3700');
var $chatInput = $("#chatInput");
var $chatLog   = $("#chatLog");

var addMessage = function(username, text) {
  var header = "<b>" + username + "</b>: ";
  $chatLog.find('tr:last').after('<tr><td>' + header + text + '</td></tr>');
  $chatLog.scrollTop($chatLog.height()); // autoscroll to bottom
}

$chatInput.keypress(function(e) {
  if(e.which == 13) { // enter key was pressed
    addMessage('derpy', this.value); //socket.emit('message', { message: this.value });
    this.value = '';
  }
});

//socket.on('message', function (data) {
//  addMessage(data.username, data.text);
//});
