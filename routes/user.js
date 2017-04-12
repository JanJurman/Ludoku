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

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
        {
        	console.log(prop);
            return false;
        }
    }

    return true;
}

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///AUTH TESTING ZBRISI ME!///////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
router.get('/forcelog', function (req, res)
{
	var User = mongoose.model('user');
	User.findOne({ 'local.eMail': "janez.novak@gmail.com",}, function(err,user)
	{
		if(user == null)
		{
			res.sendStatus(404); // auth issue				
		}
		else
		{
			req.session.userId = user.id;
			res.sendStatus(200); //OK
		}
	});
});

router.get('/forcelog/:userId', function (req, res)
{
	var User = mongoose.model('user');
	User.findOne({ _id: userId}, function(err,user)
	{
		if(user == null)
		{
			res.sendStatus(404); // auth issue				
		}
		else
		{
			req.session.userId = user.id;
			res.sendStatus(200); //OK
		}
	});
});


// POST login local
router.post('/login', function(req, res) // v post moreš dat noter { eMail : ... , pasword: ...}
{
	if(req.body['eMail'] && req.body['password'])
	{
		//INJECTION this shit
		var eMailR = req.body['eMail'];
		var passwordR = req.body['password'];

		var User = mongoose.model('user');

		User.findOne({ 'local.eMail': eMailR, 'local.passwordHash': passwordR }, function(err,user)
		{
			if(user == null)
			{
				res.sendStatus(401); // auth issue
			}
			else
			{
				req.session.userId = user.id;
				console.log(user + " has logged in localy.");
				res.sendStatus(200); //OK
			}
		});
	}
	else
	{
		res.send("Invalid input paremeters");
	}
});

// GET logout
router.post('/logout', function (req, res)
{
	delete req.session.userId;
	res.sendStatus(200);
});

// GET am i logged in?
router.get('/isLoggedIn', function(req, res)
{
	if(!req.session.userId)
	{
		res.send(false);
	}
	else
	{
		res.send(req.session.userId); // ok
	}
});

// POST registracija
router.post('/register', function(req, res, next) // {firstName: , lastName:, dateOfBirth:, eMail:, password:}
{
	if(req.body['firstName'] && req.body['lastName'] && req.body['dateOfBirth'] && req.body['sex'] && req.body['eMail'] && req.body['password'])
	{
		//INJECTION this shit
		var firstNameR = req.body['firstName'];
		var lastNameR = req.body['lastName'];
		var dateOfBirthR = req.body['dateOfBirth'];
		var sexR = req.body['sex'];
		var eMailR = req.body['eMail'];
		var passwordR = req.body['password'];

		var User = mongoose.model('user');

		User.findOne({ 'local.eMail': eMailR }, function(err, user)
		{
			if(user == null)
			{
				var user = {
					firstName: firstNameR,
					lastName: lastNameR,
					local:{
						eMail: eMailR,
						passwordHash: passwordR, //DODAJ HASH
						dateOfBirth: dateOfBirthR,
						sex: sexR
					},
					games: 0,
					tournamentGames: 0,
					gamesWon: 0,
					tournamentsWon: 0
				};

				User.create(user, function(err, newUser) {
					if(err) return next(err);
					req.session.userId = newUser.id;
					return res.send(req.session.userId);
				});
			}
			else
			{
				res.sendStatus(409); // conflict, allready in use				
			}
		});
	}
	else
	{
		res.send("Invalid input paremeters");
	}

});

// GET svoje podatke
router.get('', checkAuth, function(req, res, next) // http://127.0.0.1:3000/user
{
	mongoose.model('user').findOne({ _id: req.session.userId}, function(err,user)
	{
		if(user != null)
		{
			res.send(user.maskData()); //skrije user local.eMail, local.password, facebook.id
		}
		else
		{
			res.sendStatus(404); // user ne obstaja
		}
	});
});

// GET podatke drugega uporabnika
router.get('/:userId', checkAuth, function(req, res, next) // npr http://127.0.0.1:3000/user/892173817238zhe8123
{
	var userId = req.params.userId;
	mongoose.model('user').findOne({ _id : userId },function(err, user) //DODAJ injection check...
	{
		if(user != null)
		{
			if(user['facebook'].id == undefined)
			{
				console.log("user je local");
			}
			else
			{
				console.log("user je iz fb");
			}

			res.send(user.maskData()); //skrije user local.eMail, local.password, facebook.id
		}
		else
		{
			res.sendStatus(404); // user not found	
		}
	});
});

//GET igre od usera sorted by date
router.get('/games/:userId', checkAuth, function(req, res, next) // npr http://127.0.0.1:3000/user/games/58e391ebb94baf9df05efacd
{
	var userId = req.params.userId;
	mongoose.model('game').find({ players: userId }).sort('-finish').exec(function(err, games) //DODAJ injection check...
	{
		if(games.length > 0)
		{			
			res.send(games);
		}
		else
		{
			res.send(404); //no games found with this userId	
		}
	});
});

//get last 3 games of user
router.get('/lastGames/:userId', checkAuth, function(req, res, next) // npr http://127.0.0.1:3000/user/lastGames/58e391ebb94baf9df05efacd
{
	var userId = req.params.userId;
	mongoose.model('game').find({ players: userId }).sort('-finish').limit(3).exec(function(err, games) //DODAJ injection check...
	{
		if(games.length > 0)
		{			
			res.send(games);
		}
		else
		{
			res.send(404); //no games found with this userId
		}
	});
});

//get games at X index of user
router.get('/gamesAtPos/:userId/:index/:fetchCount', checkAuth, function(req, res, next)
{
	var userId = req.params.userId;
	var index = parseInt(req.params.index);
	var fetchCount = parseInt(req.params.fetchCount);

	if(index < 0)
	{
		index = 0;
	}

	if(fetchCount < 0)
	{
		fetchCount = 1;
	}
	else if(fetchCount > 30)
	{
		fetchCount = 30;
	}

	mongoose.model('game').find({ players: userId }).sort('-finish').skip(index).limit(fetchCount).exec(function(err, games) //DODAJ injection check...
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(games.length > 0)
			{			
				res.send(games);
			}
			else
			{
				res.send(404); //no games found with this userId
			}
		}
	});

});


router.get('/achievmentsAtPos/:userId/:index/:fetchCount', checkAuth, function(req,res,next)
{
	var userId = req.params.userId;
	var index = parseInt(req.params.index);
	var fetchCount = parseInt(req.params.fetchCount);

	if(index < 0)
	{
		index = 0;
	}

	if(fetchCount < 0)
	{
		fetchCount = 1;
	}
	else if(fetchCount > 30)
	{
		fetchCount = 30;
	}

	mongoose.model('achievments').find({players: userId}).sort('-points').skip(index).limit(fetchCount).exec(function(err, achievments)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(achievments.length > 0)
			{
				res.send(achievments);
			}
			else
			{
				res.send(404);
			}
		}
			
	});
		
});

module.exports = router;