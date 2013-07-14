var $createRoomButton = $('#createRoom');

$createRoomButton.click(function() {
  socket.emit('createRoom', {});
});

socket.on('roomCreated', function(data) {
  var roomId = data.roomId;
  stateMachine.joinRoom(roomId);
});

socket.on('hint', function(data) {
  var iframeUrl = data.url;
  $('.leaderboard').after('<iframe id="ytplayer" type="text/html" width="300" height="200" src="' + iframeUrl + '" frameborder="0" allowfullscreen>');
  $('.leaderboard').after('<h3>Video hint:</h3>');
});
