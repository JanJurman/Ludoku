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

	if(!sess.userId){ 
		//console.log("REFUSED, nisi logged in!")
		return;	//če nisi logged in do nothing
	}
	// trenutno samo izpis, ampak takole checkaš lahk če je logged in / kdo je on actualy

	// console.log('[Socket Server] User connected');
	// console.log('[Socket Server] SESSION: ' + JSON.stringify(sess));
	// console.log('[Socket Server] SESSION ID: ' + JSON.stringify(sess.userId));
	// sess.socketId = socket.id; //takole pa nekaj dodamo not
	// sess.save();    // to tud rabiš da se doda
	
	//add to redis
	redisClient.get(sess.userId+".socketsOpen",function(err,reply) {
		if(reply === null){
			reply = {numOfSockets: 1, socketIds: socket.id};
			redisClient.set(sess.userId+".socketsOpen",JSON.stringify(reply));
		}else{
			reply = JSON.parse(reply)
			reply.numOfSockets++
			if(reply.numOfSockets == 1){
				reply.socketIds += socket.id
			}else{
				reply.socketIds += "," + socket.id
			}
			redisClient.set(sess.userId+".socketsOpen",JSON.stringify(reply));
		}
	});

	socket.on('disconnect', function(){
		//remove one instance form redis
		redisClient.get(sess.userId+".socketsOpen", function(err,reply) {
			reply = JSON.parse(reply)
			reply.numOfSockets--
			var arr = reply.socketIds.split(",");
			//izloči tegale IDja in zloži nazaj
			var out = ""
			for(i=0;i<arr.length;++i){
				if(arr[i] == socket.id) 
					continue;
				if(out.length == 0)
					out += arr[i];
				else
					out += "," + arr[i]
			}
			reply.socketIds = out;
			redisClient.set(sess.userId+".socketsOpen",JSON.stringify(reply));
		});
	});


});


//to je primer api funkcije, ki bi bla dostopna v drugih modulih
socketApi.sendNotification = function(sessionId, routeToGo, reqType, dataTosend) {
	//poišči pripadajč socket id
	redisClient.get(sessionId+".socketsOpen", function(err,reply) {
		reply = JSON.parse(reply)
		reply.socketIds.split(",").forEach( function(item, index){
			io.sockets.socket().emit('notification', {route: routeToGo, type: reqType, data: dataTosend});
		});
		
	});
}

module.exports = socketApi;