var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

function checkAuth(req, res, next)
{
	if (!req.session.userId)
	{
		res.sendStatus(401); // auth issue
	}
	else
	{
		next();
	}
}

router.get('/games', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-games').exec(function(err, users) //DODAJ injection check...
	{
		if(users.length > 0)
		{
			for(var i = 0; i < users.length; ++i)
			{
				users[i] = users[i].leaderboardGames();
			}
			res.send(users);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

router.get('/tournamentGames', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-tournamentGames').exec(function(err, users) //DODAJ injection check...
	{
		if(users.length > 0)
		{
			for(var i = 0; i < users.length; ++i)
			{
				users[i] = users[i].leaderboardTournamentGames();
			}
			res.send(users);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

router.get('/gamesWon', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-gamesWon').exec(function(err, users) //DODAJ injection check...
	{
		if(users.length > 0)
		{			
			for(var i = 0; i < users.length; ++i)
			{
				users[i] = users[i].leaderboardGamesWon();
			}
			res.send(users);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

router.get('/tournamentsWon', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-tournamentsWon').exec(function(err, users) //DODAJ injection check...
	{
		if(users.length > 0)
		{
			for(var i = 0; i < users.length; ++i)
			{
				users[i] = users[i].leaderboardTournamentsWon();
			}		
			res.send(users);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

module.exports = router;