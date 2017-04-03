module.exports = function(mongoose, Schema) { 

	var gameSchema = new Schema
	(
		{
			players: [Schema.Types.ObjectId],		// array z IDji vseh igralcev, od zmagovalca do zadnjega
			type: Number,
			start: Date,							//začetek igre
			finish: Date 							//konec igre
		}
	);
	var Game = mongoose.model('game', gameSchema);
	//array of update objects
	var insertions =
	[
		{players: [
			"58e218890dc8871813b12af2",
			"58e218890dc8871813b12af5",
			"58e218890dc8871813b12af3",
			"58e218890dc8871813b12af4"
			], type: 4, start: new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)"), finish: new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)")},
		{players: [
			"58e218890dc8871813b12af3",
			"58e218890dc8871813b12af4"
			], type: 2, start: new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)"), finish: new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)")}
	];

	for (var i = 0; i < insertions.length; ++i)
	{ //malo je hack ker ne gledaš by id, ampak je itak samo for testing
		//									condition,				inserting		idkItWorks		
		Game.findOneAndUpdate({ 'players': insertions[i].players, 'start': insertions[i].start, 'finish' : insertions[i].finish}, insertions[i], {upsert:true, new: true}, function(err, game){
			if(err)
			{
				console.log("Something went wrong:   "+ err);
			}
			else
			{
				console.log(game + "\n///////////////\n");
			}
		});
	}
	console.log(new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)"));
}