var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var socketApi = require('./socketApi.js');
var redis = require('redis');
var globals = require('../globals.js')

var redisClient = redis.createClient({host : globals.ip , port : globals.redisPort});

var route = "/game"


router.get('/startGame', function(req, res)
{
	//a sem jaz host?
	var userId = req.session.userId;
	var key = "lobby." + userId;
	redisClient.get(key, function(err,reply) {
			if(reply != undefined){
				var lobby = JSON.parse(reply)
				//
				if (lobby.host == userId){ //če sm jaz host
					//delete lobby
					redisClient.del(key)
					//init game
					gameInit(lobby)
					//preko soketof povej vsem memberjem naj se redirectajo na game
					socketApi.sendNotificationToClients(lobby.members, route +  '#GAMESTART', 'GET', 'game.' + lobby.host)
				}
				else{
					//NOT LOVED
					req.sendStatus(401)
				}
				
				res.sendStatus(200) // OK
			}else{
				res.sendStatus(404) // not found
			}
	});

	// preko soketov reči vsem naj se redirectajo na game

});

//post sudoku for evaluation
router.post('/submitSudoku', function(req, res){
	if(req.body.sudoku && req.body.gameId){
		var sudoku = JSON.parse(req.body.sudoku)
		//get game from redis
		var key = req.body.gameId
		redisClient.get(key, function(err,reply) {
			if(reply != undefined){
				var game = JSON.parse(reply)

				var newProgress = evalSudoku(sudoku, game, req.session.userId)
				//temu memberju nastavi nov progress

				for(var i = 0; i < game.members.length; ++i){
					if(game.members[i] == req.session.userId){
						
						//če sm rešu sudoku do konca, mi povej da naj naslednjega naložim
						if(newProgress == 1){
							++game.members[i].currentSudoku
							sendNotificationToClient(game.members[i].id,route +  '/getSudoku', 'GET', 'game.' + game.host)
						}else{
							//normalize progress to number of sudokus
							if(game.gameType = "1v1")
								newProgress /= 5
							newProgress = game.members[i].currentSudoku * 0.2 + newProgress
						}

						game.members[i].progress = newProgress
					}
				}
				//preko soketov reči vsem naj si grejo po novi progess data
				socketApi.sendNotificationToClientsInJSONObject(game.members, route +  '/getGameProgress', 'GET', 'game.' + game.host)

				
				//save back to redis
				redisClient.set(key, game)

				res.sendStatus(200)
			}else{
				res.sendStatus(404) // not found
			}
		});
	}
});

router.get('/getSudoku/:gameId', function(req, res)
{
	// ++game.members[i].currentSudoku
	// zmaga, razn če gameType = 1v1

	var gameId = req.params.gameId
	redisClient.get(gameId, function(err,reply) {
		if(reply != undefined){
			var game = JSON.parse(reply)

			for(var i = 0; i < game.members.length; ++i){
				if(game.members[i] == req.session.userId){
					//a sm Zmago?? Ne, ti si Milan
					var curS = game.members[i].currentSudoku
					if(game.gameType == "1v1" && curS == 5 || game.gameType != "1v1" && curS == 1 ){
						//YOU WIN
						//dodaj ga med gewinerje
						game.usersFinished.push(req.session.userId)
						if(game.usersFinished.length == game.members.length){
							//fsi so konec, shrani v mongo podatke, zbrisi i redisa
							saveGameToMongo(game)
							redisClient.del(gameId)
						}else{
							redisClient.set(gameId, game)
						}
						console.log("nekdo je dokončal game")
						res.send({sudoku: null, finished: game.usersFinished.length})
					}else{
						//send next sudoku
						var sudoku = game.sudokus[curS]
						res.send({sudoku: sudoku, finished: null})
					}
				}
			}
		}else{
			res.sendStatus(404) // not found
		}
	});

});

// solution to current sudoku
router.get('/getSolution/:gameId', function(req, res)
{
	var gameId = req.params.gameId
	redisClient.get(gameId, function(err,reply) {
		if(reply != undefined){
			var game = JSON.parse(reply)

			for(var i = 0; i < game.members.length; ++i){
				if(game.members[i] == req.session.userId){
					res.send(game.sudokus[game.members[i].currentSudoku].solved)
				}
			}
		}else{
			res.sendStatus(404) // not found
		}
	});

});

var maperino = []
maperino["1v1"] = 2
maperino["8enak"] = 8
maperino["solo"] = 1

function saveGameToMongo(game){
	var Game = mongoose.model('game');

	var users = []
	game.members.forEach(function(item, index){
		users.push(mongoose.Types.ObjectId(item.id))
	})

	var gameToSave = new Game({ players: users, type: maperino[game.gameType], start: game.startTime, finish: Date().now });
	gameToSave.save(function (err, saved) {
	    if (err) return console.error(err);
	});
}

//TODO: delete this at some point?
router.get('/getGame/:gameId', function(req, res)
{
	var gameId = req.params.gameId
	var userId = req.session.userId
	redisClient.get(gameId, function(err,reply) {
		if(reply != undefined){
			var game = JSON.parse(reply)

			res.send(game)

		}else{
			res.sendStatus(404) // not found
		}
	});

});

router.get('/getGameProgress/:gameId', function(req, res)
{
	// pošlji progress vseh ostalih razn tega userja
	var gameId = req.params.gameId
	var userId = req.session.userId
	redisClient.get(gameId, function(err,reply) {
		if(reply != undefined){
			var found = false
			var game = JSON.parse(reply)
			var membs = game.members
			for(var i = 0; i < membs.length; ++i){
				if(userId == membs.id){
					membs.splice(i, 1);
					found = true;
				}
			}
			if(found){
				res.send(membs)
			}else{
				res.sendStatus(401) //ni te v tej igri, torej not allowed	
			}
		}else{
			res.sendStatus(404) // not found
		}
	});

});



function evalSudoku(sudoku, game, userId){
	//glede na gameType in current sudoku tega userja poglej kak daleč je glede na vse sudokute ki jih ma za rešit
	//najprej keri sm jaz?
	var currentSudoku = -1
	game.members.forEach(function(item, index){
		if(item.id == userId){
			currentSudoku = item.currentSudoku
		}
	});
	if(currentSudoku == -1) return 0; //failsafe

	var solvedSudoku = game.sudokus[currentSudoku].solved
	var beginingStateSudoku = game.sudokus[currentSudoku].puzzle
	var score = compareSudokus(sudoku, beginingStateSudoku, solvedSudoku)
	return score
}

function compareSudokus(partial, begin, solved){
	var score = 0, numbersInBegin = 0
	for(var i = 0; i < solved.length; ++i){
		if(begin[i]){
			++numbersInBegin
			continue //če je cifra že od začetka tam pol ne štejemo
		}
		if(partial[i] == solved[i]){
			++score
		}
	}

	// normalize score 0 - 1
	return score / (81 - numbersInBegin)
}

function isSameSudoku(s1, s2){
	for(var i = 0; i < 81; ++i){
		if(s1[i] != s2[i])
			return false
	}
	return true
}


/*
sudoku notacija:
v bazi: 123456789234567891345678912456789123567891234678912345789123456891234567912345678
	0 pomeni prazno
string lepo zaporedoma cifre ez pz
tule:
1d aray, prazno je null, ostalo je cifra kaj je
[1, 2 ,3 null, 3, ...]

*/

function getPuzzleFromDB(difficulty){
	var model = null;
	switch(difficulty){
		case "easy":
			model = mongoose.model('easySudoku');
			break;
		case "medium":
			model = mongoose.model('mediumSudoku');
			break;
		case "hard":
			model = mongoose.model('hardSudoku');
			break;
		default:
			//isto kot easy
			model = mongoose.model('easySudoku');
			break;
	}
	model.aggregate( { $sample: { size: 1 } }, function(err, sudoku){
		//return sudoku[0].sudoku  //
		return "500690001007004908089205006090050400805040103043806009058461002400000015910080034"  //for testing, pol bomo z base pobirali
	})
	
}

var sudoku = require('sudoku')
function getSudoku(difficulty){
	var puzzle = getPuzzleFromDB(game.difficulty)
	//spravi v vredi format - 1d array, prazno je null
	var cor_puzz = []
	for (var i = 0; i < puzzle.length; ++i) {
		var ch = puzzle.charAt(i)
		if(ch == "0"){
			cor_puzz.push(null)
		}else{
			cor_puzz.push(parseInt(ch) - 1)
		}
	}

	var solved = sudoku.solvepuzzle(cor_puzz)

	//dajmo nazaj v non dumb format
	for (var i = 0; i < cor_puzz.length; i++) {
		if(cor_puzz[i] != null){
			++cor_puzz[i]
		}
		++solved[i]
	}

	return {puzzle: cor_puzz, solved: solved}
}

function gameInit(lobby){
	/*
	sudoku_puzzle, sudoku_solved
	lobby.members = [{id:21963f781, progress: 0.5}, {id:21963f781, progress: 0.5} ]
	*/

	//naredimo novi redis entry
	var game = {gameType: lobby.gameType, difficulty: lobby.difficulty, host: lobby.host, members: [], sudokus: [], startTime: Date.now(), usersFinished: []}
	lobby.members.forEach(function(item, index){
		game.members.push({id: item, progress: 0, currentSudoku: 0})
	})

	if(game.gameType != "1v1"){
		game.sudokus[0] = getSudoku(game.difficulty)
		console.log(JSON.stringify(game.sudokus[0]))
	}
	else{ 
		//če je 1v1 5 sudokujev, mormo težavnost stopnjevat
		//if easy -> e e e m m
		//if med -> e m m h h
		//If hard -> m m h h h

		if(game.difficulty == "easy"){
			game.sudokus[0] = getSudoku("easy")
			game.sudokus[1] = getSudoku("easy")
			game.sudokus[2] = getSudoku("easy")
			game.sudokus[3] = getSudoku("medium")
			game.sudokus[4] = getSudoku("medium")
		}
		if(game.difficulty == "medium"){
			game.sudokus[0] = getSudoku("easy")
			game.sudokus[1] = getSudoku("medium")
			game.sudokus[2] = getSudoku("medium")
			game.sudokus[3] = getSudoku("hard")
			game.sudokus[4] = getSudoku("hard")
		}
		if(game.difficulty == "hard"){
			game.sudokus[0] = getSudoku("medium")
			game.sudokus[1] = getSudoku("medium")
			game.sudokus[2] = getSudoku("hard")
			game.sudokus[3] = getSudoku("hard")
			game.sudokus[4] = getSudoku("hard")
		}

	}

	// console.log(JSON.stringify(cor_puzz))
	// console.log(JSON.stringify(solved))

	//shrani game v redis
	redisClient.set("game." + game.host, JSON.stringify(game))

}


module.exports = router;