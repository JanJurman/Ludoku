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

router.get('/login', function(req, res, next)
{
	res.render('login');	
});

router.get('/krajnJeCigan', function(req, res, next)
{
	mongoose.model('users').find(function(err, users)
	{
		res.send(users);
	});
});


module.exports = router;
