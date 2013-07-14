var socket = io.connect('http://localhost');
socket.on('broadcastMessage', function(data) { });
socket.on('newRound', function(data) { });
socket.on('roundDone', function(data) { });
socket.on('roundStarting', function(data) { });
socket.on('roundStart', function(data) { });
//socket.emit('my other event', { my: 'data' });

// EXAMPLE CODE from http://net.tutsplus.com/tutorials/javascript-ajax/real-time-chat-with-nodejs-socket-io-and-expressjs/:
/*
var messages = [];
var socket = io.connect('http://localhost:3700');
var field = document.getElementById("field");
var sendButton = document.getElementById("send");
var content = document.getElementById("content");

socket.on('message', function (data) {
    if(data.message) {
        messages.push(data.message);
        var html = '';
        for(var i=0; i<messages.length; i++) {
            html += messages[i] + '<br />';
        }
        content.innerHTML = html;
    } else {
        console.log("There is a problem:", data);
    }
});

sendButton.onclick = function() {
    var text = field.value;
    socket.emit('send', { message: text });
};
*/
