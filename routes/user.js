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

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/////////////////////////////////
///////////////////////////////
//////////////////////////////
// AUTH TESTING ZBRISI ME!
///////////////////////////////////
///////////////////////////////
/////////////////////////////////
/////////////////////////////
router.get('/forcelog', function (req, res)
{
	var User = mongoose.model('user');
	User.findOne({ eMail: "janez.novak@gmail.com",}, function(err, user)
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

// POST login
router.post('/login', function(req, res) // v post moreš dat noter { eMail : ... , pasword: ...}
{
	if(req.body['eMail'] && req.body['password'])
	{
		//INJECTION this shit
		var eMailR = req.body['eMail'];
		var passwordR = req.body['password'];

		var User = mongoose.model('user');

		User.findOne({ eMail: eMailR, passwordHash: passwordR }, function(err,user)
		{
			if(user == null)
			{
				res.sendStatus(401); // auth issue				
			}
			else
			{
				req.session.userId = user.id;
				console.log(user + " has logged in.");
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
router.get('/logout', function (req, res)
{
	delete req.session.userId;
	res.sendStatus(200);
});

// GET am i logged in?
router.get('/isLoggedIn', function(req, res)
{
	if(!req.session.userId)
	{
		res.sendStatus(401); // auth issue
	}
	else(req.session.userId)
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

		User.findOne({ eMail: eMailR }, function(err, user)
		{
			if(user == null)
			{
				var user = {
					firstName: firstNameR,
					lastName: lastNameR,
					dateOfBirth: dateOfBirthR,
					sex: sexR,
					eMail: eMailR,
					passwordHash: passwordR //DODAJ HASH
				};

				User.create(user, function(err, newUser) {
					if(err) return next(err);
					req.session.userId = newUser.id;
					// console.log("i think it works: " + req.session.userId); 
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
	console.log(req.session.userId);
	mongoose.model('user').find({ _id : req.session.userId },function(err, user)
	{
		if(user.length > 0 )
		{
			res.send(user);					
		}
		else
		{
			res.sendStatus(401); // authorisaton issue
		}
	});
});

// GET podatke drugega uporabnika
router.get('/:userEmail', checkAuth, function(req, res, next) // npr http://127.0.0.1:3000/user/janez.novak@gmail.com
{
	var userEmail = req.params.userEmail;
	mongoose.model('user').find({ eMail : userEmail },function(err, user) //DODAJ injection check...
	{
		if(user.length > 0)
		{
			user[0]['_id'] = undefined;
			user[0]['passwordHash'] = undefined;
			
			res.send(user);
		}
		else
		{
			res.sendStatus(404); // user not found	
		}
	});
});

module.exports = router;