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

router.get('/entry', function(req, res, next)
{
	res.render('login');	
});

module.exports = router;