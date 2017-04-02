var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementEarnedSchema = new Schema
(
	{
		dateEarned: Date
	}
);

mongoose.model('achievementsEarned', achievementEarnedSchema);
