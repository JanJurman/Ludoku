var express = require('express');
var mongoose = require('mongoose');
var async = require('async');
var router = express.Router();
mongoose.Promise = global.Promise;

//zadnjih 20 igranih iger
router.get('/', function(req, res, next)
{
	mongoose.model('game').find().sort('-finish').limit(20)
	.then(games => { //DODAJ injection check...

		var rezultat = [];
		if(games.length > 0)
		{
			async.each(games, function(item, callback) 
			{
				var userIds = [];
				for(var i = 0; i < item.players.length; ++i)
				{
					userIds.push(item.players[i]);
				}

				mongoose.model('user').find({_id: {$in: userIds}}, {local:0, facebook:0}).then((users) => {
					var current = item.toObject();
					current.players = users;
					rezultat.push(current);
					callback(null,rezultat)
				})

			}, function(err){
			    if( err ) {
					console.log('Shit hit the fan');
			    } else {
					res.send(rezultat);
				}
			});
		}
		else
		{
			res.sendStatus(404); //no games present in database
		}
	})
});

router.get('/:gameId', function(req, res, next)
{
	var gameId = req.params.gameId;
	mongoose.model('game').findOne({_id: gameId})
	.then(game=> { //DODAJ injection check...
		var rezultat = [];
		game = [game]; //malo polepšaj one day
		if(game != 0)
		{
			async.each(game, function(item, callback) 
			{
				var userIds = [];
				for(var i = 0; i < item.players.length; ++i)
				{
					userIds.push(item.players[i]);
				}

				mongoose.model('user').find({_id: {$in: userIds}}, {local:0, facebook:0}).then((users) => {
					var current = item.toObject();
					current.players = users;
					rezultat.push(current);
					callback(null,rezultat)
				})

			}, function(err){
			    if( err ) {
					console.log('Shit hit the fan');
			    } else {
					res.send(rezultat[0]);
				}
			});
		}
		else
		{
			res.sendStatus(404); //no games present in database
		}
	})

});



module.exports = router;