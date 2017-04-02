var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/Ludoku');

var achievementsSchema = new Schema
(
	{
		name: String,
		description: String,
		points: Number,
		condition: String,
	}
);
var Achievement = mongoose.model('achievements', achievementsSchema);


//array of update objects
var insertions = [
{ name: "Like It's Nothing", description: "10 games played.", points: 20, condition: "TBD" },
{ name: "Can't Stop Now", description: "100 games played.", points: 20, condition: "TBD" },
{ name: "Viva La Sudoku", description: "100 games played.", points: 20, condition: "TBD" },

{ name: "Ye Got Rekt Kid", description: "Lose a game.", points: 20, condition: "TBD" },

{ name: "What A Player", description: "Win a tournament.", points: 20, condition: "TBD" },
{ name: "That's Too Bad", description: "Come in second place.", points: 20, condition: "TBD" },
];

for (var i = 0; i < insertions.length; ++i)
{ 
	//									condition,				inserting		idkItWorks		
	Achievement.findOneAndUpdate({ 'name': insertions[i].name }, insertions[i], {upsert:true, new: true}, function(err, achiv){
		if(err)
		{
			console.log("Something went wrong:   ")+ err;
		}
		else
		{
			console.log(achiv);
		}
	});
}