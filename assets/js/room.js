var $createRoomButton = $('#createRoom');

$createRoomButton.click(function() {
  socket.emit('createRoom', {});
});

socket.on('roomCreated', function(data) {
  var roomId = data.roomId;
  stateMachine.joinRoom(roomId);
});
