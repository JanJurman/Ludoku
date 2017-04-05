var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var socketApi = require(',/socketApi.js');
var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 5555});

router.get('/createLobby', function (req, res)
{
	//dodaj lobby v redis bazo
	//vrni neke podatke
	//obvesti vse socket cliente naj si fetchajo novi data
	if(req.body['gameType']){

		var userId = req.session.userId;
		var key = "lobby." + userId; //loby.USERID je torej key za lobby v redis bazi
		var value = {gameType: req.body['gameType'], host: userId, members: [] };
		redisClient.set(key, JSON.stringify(value));

		socketApi.sendNotification(sessionId, '/getLobbies', 'GET', '');

	}
});



module.exports = router;