var $chatInput = $("#chatInput");
var $chatLog   = $("#chatLog");

var addMessage = function(username, text) {
  var header = "<b>" + username + "</b>: ";
  $chatLog.find('tr:last').after('<tr><td>' + header + text + '</td></tr>');
  $chatLog.scrollTop(99999); // autoscroll to bottom
}

$chatInput.keypress(function(e) {
  if(e.which == 13) { // enter key was pressed
    addMessage('me', this.value);
    socket.emit('message', { text: this.value });
    this.value = '';
  }
});

socket.on('message', function (data) {
  addMessage(data.username, data.text);
});

