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
  $('.leaderboard').after('<div id="hinty"></div>');
  $('#hinty').append('<h3>Video hint:</h3>');
  $('#hinty').append('<iframe id="ytplayer" type="text/html" width="300" height="200" src="' + iframeUrl + '" frameborder="0" allowfullscreen>');
});

socket.on('removeHint', function(data) {
  $('#hinty').remove();
});
