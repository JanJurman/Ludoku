module.exports = function(mongoose, Schema) { 

	var Achievement = mongoose.model('achievement');

	//array of update objects
	var insertions = [
	{ name: "Like It's Nothing", description: "10 games played.", points: 10, condition: "TBD" },
	{ name: "Can't Stop Now", description: "100 games played.", points: 20, condition: "TBD" },
	{ name: "Viva La Sudoku", description: "1000 games played.", points: 40, condition: "TBD" },

	{ name: "Ye Got Rekt Kid", description: "Lose a game.", points: 10, condition: "TBD" },

	{ name: "What A Player", description: "Win a tournament.", points: 25, condition: "TBD" },
	{ name: "That's Too Bad", description: "Come in second place.", points: 10, condition: "TBD" },
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
}