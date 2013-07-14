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
  startBroadcasting: function() {
    TB.addEventListener("exception", exceptionHandler);
    var session = TB.initSession("1_MX4zNTA5NDYyMn4xMjcuMC4wLjF-U3VuIEp1bCAxNCAxNDo0MDowOSBQRFQgMjAxM34wLjYxODM1MzR-"); // Replace with your own session ID. See https://dashboard.tokbox.com/projects
    session.addEventListener("sessionConnected", sessionConnectedHandler);
    session.addEventListener("streamCreated", streamCreatedHandler);
    session.connect("35094622",
    "T1==cGFydG5lcl9pZD0zNTA5NDYyMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz03MjI2ZDk1NDQ5NWI4ZTM3NzA1YTg2MWRmMTJiMDg2ZDRhMjZkYzZkOnJvbGU9bW9kZXJhdG9yJnNlc3Npb25faWQ9MV9NWDR6TlRBNU5EWXlNbjR4TWpjdU1DNHdMakYtVTNWdUlFcDFiQ0F4TkNBeE5EbzBNRG93T1NCUVJGUWdNakF4TTM0d0xqWXhPRE0xTXpSLSZjcmVhdGVfdGltZT0xMzczODM4MDE5Jm5vbmNlPTAuNDQ3Mjg2MzkyMDIzNTYzNyZleHBpcmVfdGltZT0xMzc2NDMwMDE5JmNvbm5lY3Rpb25fZGF0YT0="); // Replace with your API key and token. See https://dashboard.tokbox.com/projects
                                              // and https://dashboard.tokbox.com/projects

    function sessionConnectedHandler(event) {
        subscribeToStreams(event.streams);
        session.publish();
    }
    
    function streamCreatedHandler(event) {
      subscribeToStreams(event.streams);
    }
    
    function subscribeToStreams(streams) {
      for (var i = 0; i < streams.length; i++) {
        var stream = streams[i];
        if (stream.connection.connectionId != session.connection.connectionId) {
          session.subscribe(stream);
        }
      }
    }
    
    function exceptionHandler(event) {
      alert("Exception: " + event.code + "::" + event.message);
    }
  }
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

