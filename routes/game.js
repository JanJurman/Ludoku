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
	//console.log("SUBMIT SUDOKU")
	if(req.body.sudoku && req.body.gameId){
		var sudoku = req.body.sudoku
		//get game from redis
		var key = req.body.gameId
		redisClient.get(key, function(err,reply) {
			if(reply != undefined){
				var game = JSON.parse(reply)

				var newProgress = evalSudoku(sudoku, game, req.session.userId)
				if(newProgress == -1){
					//narobe sudoku ali pa je šol predaleč (drugi sudoku ko je samo en)
					res.sendStatus(200)
					//console.log("A SEM TU?")
				}
				//temu memberju nastavi nov progress

				for(var i = 0; i < game.members.length; ++i){
					if(game.members[i].id == req.session.userId){
						//normalize progress to number of sudokus
						if(game.gameType == "1v1")
							newProgress /= 5
						//če sm rešu sudoku do konca, mi povej da naj naslednjega naložim
						if(newProgress == 1){
							++game.members[i].currentSudoku
							socketApi.sendNotificationToClient(game.members[i].id,route +  '/getSudoku', 'GET', 'game.' + game.host)
						}else{
							newProgress = game.members[i].currentSudoku * 0.2 + newProgress
						}

						game.members[i].progress = newProgress
					}
				}

				//save back to redis
				redisClient.set(key, JSON.stringify(game))

				//preko soketov reči vsem naj si grejo po novi progess data
				socketApi.sendNotificationToClientsInJSONObject(game.members, route +  '/getGameProgress', 'GET', 'game.' + game.host)


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
				if(game.members[i].id == req.session.userId){
					//a sm Zmago?? Ne, ti si Milan
					var curS = game.members[i].currentSudoku
					if(game.gameType == "1v1" && curS == 5 || game.gameType != "1v1" && curS == 1 ){
						//YOU WIN
						//dodaj ga med gewinerje
						game.usersFinished.push(req.session.userId)
						if(game.usersFinished.length == game.members.length){
							//fsi so konec, shrani v mongo podatke, zbrisi i redisa
							finishGame(gameId, game)
						}else{
							redisClient.set(gameId, JSON.stringify(game))
						}
						//console.log("nekdo je dokončal game")
						res.send({sudoku: null, finished: game.usersFinished.length})
					}else{
						//send next sudoku
						var sudoku = game.sudokus[curS]
						res.send({sudoku: sudoku.puzzle, finished: null})
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
				if(game.members[i].id == req.session.userId){
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
maperino["8FFA"] = 8
maperino["Solo"] = 1
maperino["Tournament"] = 100

function saveGameToMongo(game){
	var Game = mongoose.model('game');

	var users = []
	game.usersFinished.forEach(function(item, index){
		users.push(mongoose.Types.ObjectId(item))
	})

	var gameToSave = new Game({ players: users, type: maperino[game.gameType], start: game.startTime, finish: Date().now });
	gameToSave.save(function (err, saved) {
	    if (err) return console.error(err);
	});
}

function updateUserStatistics(game)
{
	var users = []
	game.usersFinished.forEach(function(item, index){
		users.push(mongoose.Types.ObjectId(item))
	})
	//update user here, no need for callback ker je vseeno če zaj al čez par ms
	var User = mongoose.model('user');
	if( maperino[game.gameType] < 100 ) //lol!    normal game
	{
		//users users sorted by finish time => prvi je winner
		User.findByIdAndUpdate(users[0],{ $inc: {gamesWon:1} }, function(err, result){
			if(err){console.log(err);}
		});
		users.forEach(function(user, index)
		{
			User.findByIdAndUpdate(user,{ $inc: {games:1} }, function(err, result){
				if(err){console.log(err);}
			});
		})
	}
	else //tournament game ma type 10X; npr 100
	{
		//users users sorted by finish time => prvi je winner
		User.findByIdAndUpdate(users[0],{ $inc: {tournamentsWon:1} }, function(err, result){
			if(err){console.log(err);}
		});
		users.forEach(function(user, index)
		{
			User.findByIdAndUpdate(user,{ $inc: {tournamentGames:1} }, function(err, result){
				if(err){console.log(err);}
			});
		})
	}


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
				if(userId == membs[i].id){
					// console.log("FOUND")
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

function finishGame(gameId, game){
	// console.log("calling finish game");
	saveGameToMongo(game)
	updateUserStatistics(game)
	redisClient.del(gameId)

	//TODO: vsem igralcem inkrementiraj št iger, čekiraj achivemente, etc...
	//TODO: daj random sudoku namesto hard coded
	//TODO: MAYBE socket obvesti vse da je konec igre
	 //socketApi.sendNotificationToClientsInJSONObject(game.members, route +  '/getGameProgress', 'GET', 'game.' + game.host)
}



function evalSudoku(sudoku, game, userId){
	//glede na gameType in current sudoku tega userja poglej kak daleč je glede na vse sudokute ki jih ma za rešit
	//najprej keri sm jaz?
	var currentSudoku = -1
	game.members.forEach(function(item, index){
		if(item.id == userId){
			currentSudoku = item.currentSudoku
		}
	});
	if(currentSudoku == -1 || currentSudoku >= game.sudokus.length) return -1; //failsafe

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

function getPuzzlesFromDB(difficulty, game, lobby){
	var index = 0
	var puzzleList = new Array()
	fetchPuzzleFromMongoRec(difficulty, index, puzzleList, game, lobby, getSudokus);
}

function fetchPuzzleFromMongoRec(difficulty, index, puzzleList, game, lobby, callback)
{
	if(index < difficulty.length)
	{
		var model = null;
		switch(difficulty[index]){
			case "Easy":
				model = mongoose.model('easySudoku');
				break;
			case "Medium":
				model = mongoose.model('mediumSudoku');
				break;
			case "Hard":
				model = mongoose.model('hardSudoku');
				break;
			default:
				model = mongoose.model('easySudoku');
				break;
		}

		model.aggregate( { $sample: { size: 1 } }, function(err, sudoku){
			if(err)console.log(err);
			puzzleList.push(sudoku[0].sudoku)
			fetchPuzzleFromMongoRec(difficulty, index + 1, puzzleList, game, lobby, callback);
		})
	}
	else
	{
		callback(puzzleList, game,lobby) //gremo v getSudokus
	}
}

var sudoku = require('sudoku')
function getSudokus(puzzleList, game, lobby){
	
	var readySudokus = new Array();
	puzzleList.forEach(function(puzzle, index) //puzzle je string
	{
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
		readySudokus.push({puzzle: cor_puzz, solved: solved})
	})

	game.sudokus = readySudokus
	redisClient.set("game." + game.host, JSON.stringify(game))
	//preko soketof povej vsem memberjem naj se redirectajo na game
	socketApi.sendNotificationToClients(lobby.members, '#GAMESTART', 'GET', 'game.' + lobby.host)

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

	var difficulty = []

	if(game.gameType != "1v1"){
		difficulty = [game.difficulty];
		// console.log(JSON.stringify(game.sudokus[0]))
	}
	else{ 
		//če je 1v1 5 sudokujev, mormo težavnost stopnjevat
		//if easy -> e e e m m
		//if med -> e m m h h
		//If hard -> m m h h h
		if(game.difficulty == "Easy"){
			difficulty = ["Easy","Easy","Easy","Medium","Medium"]

			// game.sudokus[0] = getSudoku("Easy")
			// game.sudokus[1] = getSudoku("Easy")
			// game.sudokus[2] = getSudoku("Easy")
			// game.sudokus[3] = getSudoku("Medium")
			// game.sudokus[4] = getSudoku("Medium")
		}
		if(game.difficulty == "Medium"){
			difficulty = ["Easy","Medium","Medium","Hard","Hard"]
			// game.sudokus[0] = getSudoku("Easy")
			// game.sudokus[1] = getSudoku("Medium")
			// game.sudokus[2] = getSudoku("Medium")
			// game.sudokus[3] = getSudoku("Hard")
			// game.sudokus[4] = getSudoku("Hard")
		}
		if(game.difficulty == "Hard"){
			difficulty = ["Medium","Medium","Hard","Hard","Hard"]
			// game.sudokus[0] = getSudoku("Medium")
			// game.sudokus[1] = getSudoku("Medium")
			// game.sudokus[2] = getSudoku("Hard")
			// game.sudokus[3] = getSudoku("Hard")
			// game.sudokus[4] = getSudoku("Hard")
		}
	}
	getPuzzlesFromDB(difficulty, game, lobby)
	// game.sudokus = getSudokus(difficulty, callback) //TODO wrap shit up

	// console.log(JSON.stringify(cor_puzz))
	// console.log(JSON.stringify(solved))

	//shrani game v redis
	// console.log("ADDED GAME TO REDIS? /////////////////////////////")
	// console.log(JSON.stringify(game));
}


module.exports = router;