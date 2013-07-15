var apiKey = "35094622";
var sessionId = "1_MX4zNTA5NDYyMn4xMjcuMC4wLjF-U3VuIEp1bCAxNCAxNjo0ODoxMSBQRFQgMjAxM34wLjcwNDIyMTl-"; // Replace with your own session ID. See https://dashboard.tokbox.com/projects
var token = "T1==cGFydG5lcl9pZD0zNTA5NDYyMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz02NTgyMTNmMGE1MmY1ODQ2MTFjNWY4MThiNWEyNzkxZmFkNWI0OGQ1OnJvbGU9bW9kZXJhdG9yJnNlc3Npb25faWQ9MV9NWDR6TlRBNU5EWXlNbjR4TWpjdU1DNHdMakYtVTNWdUlFcDFiQ0F4TkNBeE5qbzBPRG94TVNCUVJGUWdNakF4TTM0d0xqY3dOREl5TVRsLSZjcmVhdGVfdGltZT0xMzczODQ1Njk4Jm5vbmNlPTAuMzg4NTM5MTAzOTY1MjE3NCZleHBpcmVfdGltZT0xMzc2NDM3Njk4JmNvbm5lY3Rpb25fZGF0YT0="; // Replace with a generated token. See https://dashboard.tokbox.com/projects
var PROPS = {width: 600, height: 500};
var myDiv = 'actorContainer'

// Initialize session, set up event listeners, and connect

var session = TB.initSession(sessionId);
session.addEventListener('sessionConnected', sessionConnectedHandler);
session.addEventListener('streamCreated', streamCreatedHandler);
session.connect(apiKey, token);

function sessionConnectedHandler(event) {
  if (event.streams.length == 0) { // if we're the first, we are permahosted
    var publisher = TB.initPublisher(apiKey, myDiv, PROPS);
    session.publish(publisher);
  } else {
    subscribeToStreams(event.streams);
  }
}

// Subscribe to any new streams that are created
function streamCreatedHandler(event) {
  subscribeToStreams(event.streams);
}

function subscribeToStreams(streams) {
  for (var i = 0; i < streams.length; i++) {
    // Make sure we don't subscribe to ourself
    if (streams[i].connection.connectionId == session.connection.connectionId) {
      return;
    }

    // Create the div to put the subscriber element in to
    var divParent = document.getElementById(myDiv);
    var div = document.createElement('div');
    div.setAttribute('id', 'stream' + streams[i].streamId);
    divParent.appendChild(div);

    // Subscribe to the stream
    session.subscribe(streams[i], div.id, PROPS);
  }
}
