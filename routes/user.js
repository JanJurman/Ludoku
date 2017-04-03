var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET self listing. */
router.get('/', function(req, res, next) // npr http://127.0.0.1:3000/user?loginHash=a
{
		//najdi usera ko ma toti hash ki ga je poslal v get parametrih
		var userLoginHash = req.query['loginHash'];
		if(userLoginHash != "") //DODAJ INJECTION PROTECTION: al check za type string al pa require('mongo-sanitize');
		{
			mongoose.model('user').find({ loginHash : userLoginHash },function(err, user)
			{
				if(user != "")
				{
					res.send(user);					
				}
				else
				{
					res.send("Nisi logged al pa hash doesn't match"); //spremeni na nekaj lepšega, mogoče status?
				}
			});
		}
});

// // registracija
// router.get('/', function(req, res, next) // npr http://127.0.0.1:3000/user?loginHash=a
// {
	
// });


module.exports = router;
