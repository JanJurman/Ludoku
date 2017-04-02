var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema
(
	{
		players: Array,		// array z IDji vseh igralcev
		standings: Array,   // IDji porsti glede na zmago, #1, #2, #3...
		
	}
);

mongoose.model('game', gameSchema);
