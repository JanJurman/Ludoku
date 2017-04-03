module.exports = function(mongoose, Schema) { 
	var userSchema = new Schema
	(
		{
			eMail: String,
			passwordHash: String,
			firstName: String,
			lastName: String,
			dateOfBirth: Date,
			sex: String,
			games: Number,
			tournamentGames: Number,
			gamesWon: Number,
			tournamentsWon: Number
		}
	);

	var User = mongoose.model('users', userSchema);

	//array of update objects
	var insertions = [
	{ eMail: "janez.novak@gmail.com", passwordHash: "jazSemJanez", firstName: "Janez", lastName: "Novak", dateOfBirth: new Date("7.25.1992"), sex:"M", games:0, tournamentGames:0, gamesWon:0, tournamentsWon:0},
	{ eMail: "nina.novak@gmail.com", passwordHash: "jazSemNina", firstName: "Nina", lastName: "Novak", dateOfBirth: new Date("3.12.1993"), sex:"F", games:0, tournamentGames:0, gamesWon:0, tournamentsWon:0},
	{ eMail: "dmitry.glukhovksy@gmail.com", passwordHash: "cyka", firstName: "Dmitry", lastName: "Glukhovsky", dateOfBirth: new Date("12.6.1979"), sex:"M", games:0, tournamentGames:0, gamesWon:0, tournamentsWon:0},
	{ eMail: "Ashley Barett", passwordHash: "speak", firstName: "Ashley", lastName: "Barett", dateOfBirth: new Date("2.11.1984"), sex:"F", games:0, tournamentGames:0, gamesWon:0, tournamentsWon:0},
	];

	for (var i = 0; i < insertions.length; ++i)
	{ 
		//									condition,				inserting		idkItWorks		
		User.findOneAndUpdate({ 'eMail': insertions[i].eMail }, insertions[i], {upsert:true, new: true}, function(err, user){
			if(err)
			{
				console.log("Something went wrong:   "+ err);
			}
			else
			{
				console.log(user);
			}
		});
	}
}