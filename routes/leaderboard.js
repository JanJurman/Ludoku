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
	mongoose.model('user').find().sort('-games').exec(function(err, user) //DODAJ injection check...
	{
		if(user.length > 0)
		{
			for(var i = 0; i < user.length; ++i)
			{
				user[i] = user[i].leaderboardGames();
			}
			res.send(user);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

router.get('/tournamentGames', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-tournamentGames').exec(function(err, user) //DODAJ injection check...
	{
		if(user.length > 0)
		{
			for(var i = 0; i < user.length; ++i)
			{
				user[i] = user[i].leaderboardTournamentGames();
			}
			res.send(user);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

router.get('/gamesWon', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-gamesWon').exec(function(err, user) //DODAJ injection check...
	{
		if(user.length > 0)
		{			
			for(var i = 0; i < user.length; ++i)
			{
				user[i] = user[i].leaderboardGamesWon();
			}
			res.send(user);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

router.get('/tournamentsWon', checkAuth, function(req, res, next)
{
	mongoose.model('user').find().sort('-tournamentsWon').exec(function(err, user) //DODAJ injection check...
	{
		if(user.length > 0)
		{
			for(var i = 0; i < user.length; ++i)
			{
				user[i] = user[i].leaderboardTournamentsWon();
			}		
			res.send(user);
		}
		else
		{
			res.send(404); //no users present in database
		}
	});
});

module.exports = router;