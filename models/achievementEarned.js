var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementEarnedSchema = new Schema
(
	{
		dateEarned: Date
	}
);

mongoose.model('achievementEarned', achievementEarnedSchema);


//verjetno bo removed