var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

//redis connect
var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 5555});

redisClient.on('ready',function() {
 console.log("[Redis Client] Redis client is ready");
});

redisClient.on('error',function() {
 console.log("[Redis Client] Error in Redis client");
});


//on connect
io.on('connection', function(socket){
	sess = socket.handshake.session
	if(!sess.userId) return;
	//trenutno samo izpis, ampak takole checkaš lahk če je logged in / kdo je on actualy

	console.log('[Socket Server] User connected');
	console.log('[Socket Server] SESSION ID: ' + JSON.stringify(sess));
	console.log('[Socket Server] SESSION ID: ' + JSON.stringify(sess.userId));
	sess.banana = 5; //takole pa nekaj dodamo not
	sess.save();    // to tud rabiš
	
	socketApi.sendNotification()

	//add to redis
	//naj se doda samo če je logged in, torej ko ma neki key prave al w/e
	redisClient.get(sess.userId+".logins",function(err,reply) {
		if(reply === null)
			reply = 0;
		redisClient.set(sess.userId+".logins",+reply + 1);
		console.log("logins: " + (+reply + 1));
	});

	socket.on('disconnect', function(){
		console.log('[Socket Server] User disconnected');
		
		//remove from redis, isto pazi na key
		redisClient.get(sess.userId+".logins", function(err,reply) {
			redisClient.set(sess.userId+".logins",+reply - 1);
			console.log("logins: " + (reply-1));
		});
	});

	socket.on('testEmit', function (name, fn) {
		console.log("Ime je " + name);
		fn('woot!!');
	});

});


//to je primer api funkcije, ki bi bli dostopna v drugih modulih
socketApi.sendNotification = function() {
	io.sockets.emit('hello', {msg: 'Hello Tjaž!'});

}

module.exports = socketApi;