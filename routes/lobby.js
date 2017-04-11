var express = require('express');
//var mongoose = require('mongoose');
var router = express.Router();
var socketApi = require('./socketApi.js');
var redis = require('redis');
var globals = require('../globals.js')

var redisClient = redis.createClient({host : globals.ip , port : globals.redisPort});

var route = "/lobby"
/*
GAMETYPES:
1v1 5 zaporednih sudokujev: "1v1"
do 8 playerjev enak sudoku: "8FFA"
solo gamemode: 				"Solo"

more TBD

DIFFICULTIES (velja samo pri 8FFA):
Easy
Medium
Hard
*/
function addLobbyToTracker(lobbyId){
	redisClient.get("lobbies", function(err,reply) {
		if(reply === null){
			//če ga ni ga narediš
			var lobbyIds = [lobbyId]
			redisClient.set("lobbies", JSON.stringify(lobbyIds))
		}else{
			var lobbyIds = JSON.parse(reply)
			if(lobbyIds.indexOf(lobbyId) < 0)
			{
				lobbyIds.push(lobbyId)
				redisClient.set("lobbies", JSON.stringify(lobbyIds))
			}
		}
	});
}

function removeLobbyFromTracker(lobbyId){
	redisClient.get("lobbies", function(err,reply) {
		if(reply !== null){
			var lobbyIds = JSON.parse(reply)
			var index = lobbyIds.indexOf(lobbyId);
			if (index > -1) {
			    lobbyIds.splice(index, 1);
			}
			redisClient.set("lobbies", JSON.stringify(lobbyIds))
		}
	});
}

router.get('/createLobby', function (req, res)
{

	//dodaj lobby v redis bazo
	//vrni neke podatke
	//obvesti vse socket cliente naj si fetchajo novi data
	var userId = req.session.userId;
	var key = "lobby." + userId; //lobby.USERID je torej key za lobby v redis bazi
	var value = {gameType: "", difficulty: "", host: userId, members: [userId] };

	//baci to v bazo, če lobby že obstaja se takintak zamenja value
	redisClient.set(key, JSON.stringify(value));

	//add to lobbies tracker
	addLobbyToTracker(key)
	// console.log("Lobby created. " +key +": "+ JSON.stringify(value));

	socketApi.sendNotificationToAll(route + '/getLobbies', 'GET', '') //naj si vsi grejo po lobbije spet, saj je zaj en poleg

	//vrnemo lobby ID
	res.send(key)

});

//DEPRECATED for testing purposes only
router.get('/removeLobby', function (req, res)
{
	var userId = req.session.userId;
	var key = "lobby." + userId; //lobby.USERID je torej key za lobby v redis bazi

	//zbrisi iz redis
	redisClient.del(key);

	//remove from lobbies tracker
	removeLobbyFromTracker(key)

	socketApi.sendNotificationToAll(route + '/getLobbies', 'GET', '') //naj si vsi grejo po lobbije spet, saj je zaj en zginu

	//vrnemo OK
	res.sendStatus(200);

});

router.post('/setLobbyParams', function(req, res)
{
	if(req.body.gameType && req.body.difficulty){
		var userId = req.session.userId;
		var key = "lobby." + userId;
		redisClient.get(key, function(err,reply) {
			if(reply !== null){
				var lobbyData = JSON.parse(reply)
				lobbyData.gameType = req.body.gameType
				lobbyData.difficulty = req.body.difficulty

				redisClient.set(key, JSON.stringify(lobbyData));

				//povej vsem v lobbyju da je lobby data updated; pošlješ jim še lobby ID za ziher
				if(lobbyData.members != null && lobbyData.members.length != 0)
				{
					socketApi.sendNotificationToClients(lobbyData.members, route +  '/getLobbyParams', 'GET', key)
				}
				//povej vsem da je novi lobby data
				socketApi.sendNotificationToAll(route + '/getLobbies', 'GET', '')
				res.sendStatus(200) //OK
			}else{
				res.sendStatus(404) // not found
			}
		});
	}else{
		res.sendStatus(422) // unprocesable entity
	}

});

router.get('/getLobbyParams/:lobbyId', function(req, res)
{
	var lobbyId = req.params.lobbyId;
	if(lobbyId){
		var key = lobbyId
		redisClient.get(key, function(err,reply) {
			if(reply != undefined){
				res.send(reply) // celi json object
			}else{
				res.sendStatus(404) //not found
			}
		});
	}else{
		res.sendStatus(422) // unprocesable entity
	}

});

router.get('/getLobbies', function(req, res)
{
	//pošlji mu vse lobbije
	redisClient.get('lobbies', function(err,reply) {
		var lobbyIds = JSON.parse(reply)
		//foreach lobbyID get lobby data, add to array
		var lobbiesData = []
		
		redisClient.mget(lobbyIds, function(err,reply) {
		if(reply != undefined){
			reply.forEach(function(item, index){
				reply[index] = JSON.parse(item);
			})
			res.send(reply)
		}
		else
		{
			res.send([]);
		}
		});

	});

});

router.get('/joinLobby/:lobbyId', function(req, res)
{
	var lobbyId = req.params.lobbyId;
	if(lobbyId){
		var key = lobbyId
		//dodaj memberja v redis
		redisClient.get(key, function(err,reply) {
			if(reply != undefined){
				var lobby = JSON.parse(reply)
				//ali je tale d00d že not?
				if (lobby.members.indexOf(req.session.userId) == -1) {
				 	lobby.members.push(req.session.userId) //dodaj userja v memberje lobbija
					redisClient.set(key, JSON.stringify(lobby));

					//socket to all lobby members to fetch new lobby data
					// console.log("socket noficication to all, fetch new lobby params")
					socketApi.sendNotificationToClients(lobby.members, route +  '/getLobbyParams', 'GET', key)
				}
				
				res.sendStatus(200) // OK
			}else{
				res.sendStatus(404) // not found
			}
		});
	}else{
		res.sendStatus(404) // not found
	}
});

// kaj pa če host zapusti lobby???, pol naj client side se glede če je host med memberji, če ni, leaveš lobby in greš nazaj na lobby view
router.get('/leaveLobby/:lobbyId', function(req, res)
{
	var lobbyId = req.params.lobbyId;
	if(lobbyId){
		var key = lobbyId
		//dodaj memberja v redis
		redisClient.get(key, function(err,reply) {
			if(reply != undefined){
				var lobby = JSON.parse(reply)
				//odstrani ga iz members
				var index = lobby.members.indexOf(req.session.userId);
				if (index > -1) {
				    lobby.members.splice(index, 1);
				}

				if(lobby.members.length > 0){
					redisClient.set(key, JSON.stringify(lobby));
					
					var index = lobby.members.indexOf(lobby.host);
					if (index == -1) {
					    //če je host šel, naj vsi leavajo
					    socketApi.sendNotificationToClients(lobby.members, route +  '/leaveLobby', 'GET', key)
					}else{
					//drugače pa socket to all lobby members to fetch new lobby data
					socketApi.sendNotificationToClients(lobby.members, route +  '/getLobbyParams', 'GET', key)
					}
				}
				else{
					//če je members array prazn, delete lobby from redis
					redisClient.del(key)
					removeLobbyFromTracker(key)
					socketApi.sendNotificationToAll(route + '/getLobbies', 'GET', '') //naj si vsi grejo po lobbije spet, saj je zaj en zginu
				}

				res.sendStatus(200) // OK
			}else{
				res.sendStatus(404) //not found
			}
		});
	}else{
		res.sendStatus(404) // not found
	}
});


module.exports = router;