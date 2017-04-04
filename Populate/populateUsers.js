module.exports = function(mongoose, Schema) { 

	var User = mongoose.model('user');

	//array of update objects
	var insertions = [
		{ eMail: "janez.novak@gmail.com", passwordHash: "jazSemJanez", firstName: "Janez", lastName: "Novak", dateOfBirth: new Date("7.25.1992"), sex:"M", games:12, tournamentGames:3, gamesWon:2, tournamentsWon:1},
		{ eMail: "nina.novak@gmail.com", passwordHash: "jazSemNina", firstName: "Nina", lastName: "Novak", dateOfBirth: new Date("3.12.1993"), sex:"F", games:32, tournamentGames:10, gamesWon:12, tournamentsWon:4},
		{ eMail: "dmitry.glukhovsky@gmail.com", passwordHash: "cyka", firstName: "Dmitry", lastName: "Glukhovsky", dateOfBirth: new Date("12.6.1979"), sex:"M", games:120, tournamentGames:12, gamesWon:40, tournamentsWon:3},
		{ eMail: "ashley.barrett@gmail.com", passwordHash: "speak", firstName: "Ashley", lastName: "Barett", dateOfBirth: new Date("2.11.1984"), sex:"F", games:4, tournamentGames:0, gamesWon:1, tournamentsWon:0},
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