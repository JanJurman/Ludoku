var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var socketApi = require('./socketApi.js');
var redis = require('redis');
var globals = require('../globals.js')

var redisClient = redis.createClient({host : globals.ip , port : globals.redisPort});


/*
GAMETYPES:
1v1 5 zaporednih sudokujev: "1v1"
do 8 playerjev enak sudoku: "8enak"
more TBD

DIFFICULTIES (velja samo pri 8enak):
easy
medium
hard
*/
function addLobby(lobbyId){
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

function removeLobby(lobbyId){
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
	var value = {gameType: "", difficulty: "", host: userId, members: [] };

	//baci to v bazo, če lobby že obstaja se takintak zamenja value
	redisClient.set(key, JSON.stringify(value));

	//add to lobbies tracker
	addLobby(key)
	console.log("Lobby created. " +key +": "+ JSON.stringify(value));

	socketApi.sendNotificationToAll('/game/getLobbies', 'GET', '') //naj si vsi grejo po lobbije spet, saj je zaj en poleg

	//vrnemo OK
	res.sendStatus(200);

});

router.get('/removeLobby', function (req, res)
{
	var userId = req.session.userId;
	var key = "lobby." + userId; //lobby.USERID je torej key za lobby v redis bazi

	//zbrisi iz redis
	redisClient.del(key);

	//remove from lobbies tracker
	removeLobby(key)

	socketApi.sendNotificationToAll('/game/getLobbies', 'GET', '') //naj si vsi grejo po lobbije spet, saj je zaj en zginu

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
					socketApi.sendNotificationToClients(lobbyData.members, "/game/getLobbyParams", "GET", {lobbyId: key})
				}
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
			res.send(reply) //TODO: ALI TO DELA??? stringi v arrayu so JSON.stringyfied objekti, ki niso bli parsani
		}
		else
		{
			res.send([]);
		}
		});

	});

});

/*
Dodaj:

- joinLobby
- leaveLobby
- maybe razdelitev na /lobby & /game

//  (\/)
	(° )
	/  \
   / , |-<
  / /\/
*///

module.exports = router;