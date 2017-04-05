var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var router = express.Router();

//Load all files in models folder
fs.readdirSync(__dirname + '/../models').forEach(function(filename)
{
	require(__dirname + '/../models/' + filename)
});

router.get('/', function(req, res, next)
{
	res.render('index');
});

router.get('/facebook', function(req, res, next)
{
	res.render('faceView');
});

router.post('/loginFacebook', function(req, res, next)
{
	//console.log(JSON.stringify(req.body));

	//tu pride login... premakni v /user...
	if(req.body['id'])
	{
		//INJECTION this shit
		var User = mongoose.model('user');

		User.findOne({ 'facebook.id': req.body['id']}, function(err,user)
		{
			if(user == null)
			{
				//registriraj ga

				var nameSplit = req.body['name'].split(/[ ,]+/);
				var firstNameR = "";
				var lastNameR = "";
				if(nameSplit.length > 0)
				{
					firstNameR = nameSplit[0];
					for(var i = 1; i < nameSplit.length; ++i) //infine string danger? vrjetno fb ni scumbag
					{
						lastNameR += nameSplit[i];
					}
				}

				console.log(nameSplit);
				console.log(firstNameR);
				console.log(lastNameR);

				var user = {
					firstName: firstNameR,
					lastName: lastNameR,
					facebook:{
						id: req.body['id']
					},
					games: 0,
					tournamentGames: 0,
					gamesWon: 0,
					tournamentsWon: 0
				};

				User.create(user, function(err, newUser) {
					if(err) res.send(500);	
					req.session.userId = newUser.id;
					console.log("user je bil registriran s fb.");
					return res.send(req.session.userId);
				});

			}
			else
			{
				req.session.userId = user.id;
				console.log(user + " has logged in from fb.");
				res.send(req.session.userId); //OK
			}
		});
	}
	else
	{
		res.send("Invalid input paremeters");
		//res.sendStatus(422) //unprocessable entity ~ invalid input

	}
});

module.exports = router;