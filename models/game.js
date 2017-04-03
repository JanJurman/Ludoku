var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema
(
	{
		players: [Schema.Types.ObjectId],		// array z IDji vseh igralcev, od zmagovalca do zadnjega
		type: Number,				//zaenkrat: 4 ~ 4 player   8~player     npr 108 ~ tournament
		start: Date,				//začetek igre
		finish: Date 				//konec igre
	}
);

mongoose.model('game', gameSchema);
