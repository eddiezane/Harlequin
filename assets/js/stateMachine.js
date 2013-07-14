var $splashDiv = $('#splash');
var $lobbyDiv  = $('#lobby');
var $roomDiv   = $('#room');
var $allDivs   = $('#splash #lobby #room');

$splashDiv.show(); // for now...

stateMachine = {
  joinRoom: function(roomId) {
    window.history.pushState("", "", '/room/' + roomId);
    socket.emit('joinRoom', { roomId: roomId });
    $allDivs.hide();
    $lobbyDiv.show();
  },
}
