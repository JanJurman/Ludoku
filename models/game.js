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


gameSchema.methods.getGameWithUsers = function getGameWithUsers(item)
{
	var userIds = [];
	for(var i = 0; i < item.players.length; ++i)
	{
		userIds.push(item.players[i]);
	}
	mongoose.model('user').find({_id: {$in: userIds}}).exec(function(err, users)	
	{
		var gwu = item.toObject();
		gwu.players = users;
		return gwu;
	})
};

mongoose.model('game', gameSchema);