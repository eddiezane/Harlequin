var $splashDiv = $('#splash');
var $lobbyDiv  = $('#lobby');
var $roomDiv   = $('#room');
var $allDivs   = $('#splash, #lobby, #room');
var getRoomId = function() {
  matches = location.pathname.match(/room\/(.*)/);
  if (!matches) return '';
  return matches[1];
}

stateMachine = {
  joinRoom: function(roomId) {
    if (!getRoomId()) { // unless already in room
      window.history.pushState("", "", '/room/' + roomId); // not always needed
    }
    socket.emit('joinRoom', { roomId: roomId });
    $allDivs.hide();
    $roomDiv.show();
  },
}

if (location.pathname.match(/room/)) {
  var roomId = getRoomId();
  if (roomId.length > 0) {
    stateMachine.joinRoom(roomId);
  } else {
    $lobbyDiv.show();
  }
} else {
  $splashDiv.show();
}

