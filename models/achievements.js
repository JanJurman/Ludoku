var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementsSchema = new Schema
(
	{
		name: String,
		description: String,
		points: String,
		condition: String
	}
);

mongoose.model('achievements', achievementsSchema);
