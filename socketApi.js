var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
    socketApi.sendNotification()
    socket.on('testEmit', function (name, fn) {
    	console.log("Ime je " + name);
		fn('woot!!');
	});
});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello Tjaž!'});

}

module.exports = socketApi;