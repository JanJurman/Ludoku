var populate = function(insertions, index)
{
	if(index == insertions.length)
	{
		setTimeout(process.exit, 1000);
	}
	else
	{
		require(insertions[index])(mongoose,Schema);
		setTimeout(populate.bind(null, insertions, index+1), 500);
	}
}

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');

fs.readdirSync(__dirname + '/../models').forEach(function(filename)
{
	require(__dirname + '/../models/' + filename)
});
mongoose.connect('mongodb://127.0.0.1:27017/Ludoku');

require("./populateAchievements.js")(mongoose,Schema);
require("./populateUsers.js")(mongoose,Schema);

var timeDependantInsertions = ["./populateGames.js"];
var index = 0;
setTimeout(populate.bind(null, timeDependantInsertions, index), 500);