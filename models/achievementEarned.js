var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementEarnedSchema = new Schema
(
	{
		dataEarned: Date
	}
);

mongoose.model('achievements', achievementEarnedSchema);
