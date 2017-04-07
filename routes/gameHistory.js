var express = require('express');
var mongoose = require('mongoose');
var async = require('async');
var router = express.Router();
mongoose.Promise = global.Promise;

//zadnjih 20 igranih iger
router.get('/', function(req, res, next)
{
	// mongoose.model('game').find().sort('-finish').limit(20).exec(function(err, game) //DODAJ injection check...
	// {
	// 	if(game.length > 0)
	// 	{

	// 		var userIds = [];
	// 		for(var i = 0; i < game[0].players.length; ++i)
	// 		{
	// 			userIds.push(game[0].players[i]);
	// 			// userIds.push(mongoose.Types.ObjectId(game[0].players[i]));
	// 		}
	// 		console.log(userIds);
	// 		mongoose.model('user').find({_id: {$in: userIds}}).exec(function(err, users)	
	// 		{
	// 			res.send(users);
	// 		});
	// 	}
	// 	else
	// 	{
	// 		res.send(404); //no games present in database
	// 	}
	// });

	// mongoose.model('game').find().sort('-finish').limit(20).exec(function(err, game) //DODAJ injection check...
	// {
	// 	var results = [];
	// 	if(game.length > 0)
	// 	{
	// 		game.forEach (function (item, index)
	// 		{
	// 			var userIds = [];
	// 			for(var i = 0; i < item.players.length; ++i)
	// 			{
	// 				userIds.push(item.players[i]);
	// 			}

	// 			mongoose.model('user').find({_id: {$in: userIds}}).exec(function(err, users)	
	// 			{
	// 				var test = item.toObject();
	// 				test.players = users;
	// 				//console.log(test);
	// 				results.push(item);
	// 			})
	// 		});
	// 	}
	// 	else
	// 	{
	// 		res.sendStatus(404); //no games present in database
	// 	}
	// 	return results;
	// })
	// 	.then(results => {
	// 		//console.log(results);
	// 		res.send(results)
	// 	});

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

				mongoose.model('user').find({_id: {$in: userIds}}).then((users) => {
					var test = item.toObject();
					test.players = users;
					// console.log(test);
					console.log("pushed item");
					rezultat.push(test);
					callback(null,rezultat)
				})

			}, function(err){
			    // if any of the file processing produced an error, err would equal that error
			    if( err ) {
			      // One of the iterations produced an error.
			      // All processing will now stop.
			      console.log('A file failed to process');
			    } else {
			      console.log('All files have been processed successfully');
			      res.send(rezultat[0]);
			    }
			});


			// //ASYNC PROBLEM
			// game.forEach (function (item, index)
			// {
			// 	var userIds = [];
			// 	for(var i = 0; i < item.players.length; ++i)
			// 	{
			// 		userIds.push(item.players[i]);
			// 	}

			// 	mongoose.model('user').find({_id: {$in: userIds}}).exec(function(err, users)	
			// 	{
			// 		var test = item.toObject();
			// 		test.players = users;
			// 		// console.log(test);
			// 		console.log("pushed item");
			// 		results.push(item);
			// 		return item;
					
			// 	}).then((item) => {
			// 		conosle.log(blasphemy);
			// 		++blasphemy;
			// 		if(blasphemy == game.length - 1)
			// 		{
			// 			return results;
			// 		}
			// 	})
			// });
			//ASYNC PROBLEM
		}
		else
		{
			res.sendStatus(404); //no games present in database
		}
		console.log("finished inner loop");
	})
		// .then((results) => {
		// 	console.log(results);
		// 	console.log("done");
		// 	res.send(results)
		// })
		// .catch(function(err){
		// 	// just need one of these
		// 	console.log('error:', err);
		// });


});


//
router.get('/:gameId', function(req, res, next)
{

});



module.exports = router;