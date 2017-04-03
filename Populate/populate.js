var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/Ludoku');

require("./populateAchievements.js")(mongoose,Schema);
require("./populateUsers.js")(mongoose,Schema);
require("./populateGames.js")(mongoose,Schema);	
