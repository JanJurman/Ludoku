module.exports = function(mongoose, Schema) { 

	var User = mongoose.model('user');

	//array of update objects
	var insertions = [
		{ local:{eMail: "janez.novak@gmail.com", passwordHash: "jazSemJanez", dateOfBirth: new Date("7.25.1992"), sex:"M"}, firstName: "Janez", lastName: "Novak", games:1217, tournamentGames:3, gamesWon:200, tournamentsWon:1},
		{ local:{eMail: "nina.novak@gmail.com", passwordHash: "jazSemNina", dateOfBirth: new Date("3.12.1993"), sex:"F"},  firstName: "Nina", lastName: "Novak", games:32, tournamentGames:10, gamesWon:12, tournamentsWon:4},
		{ local:{eMail: "dmitry.glukhovsky@gmail.com", passwordHash: "cyka", dateOfBirth: new Date("12.6.1979"), sex:"M"}, firstName: "Dmitry", lastName: "Glukhovsky", games:120, tournamentGames:12, gamesWon:40, tournamentsWon:3},
		{ local:{eMail: "ashley.barrett@gmail.com", passwordHash: "speak", dateOfBirth: new Date("2.11.1984"), sex:"F"}, firstName: "Ashley", lastName: "Barett", games:4, tournamentGames:15, gamesWon:1, tournamentsWon:0},
		{ facebook:{id: "fbTestId"}, firstName: "Face", lastName: "Book", games:4, tournamentGames:0, gamesWon:1, tournamentsWon:0},
	];


	for (var i = 0; i < insertions.length; ++i)
	{ 
		//									condition,				inserting		idkItWorks		
		User.findOneAndUpdate({ firstName: insertions[i].firstName, lastName: insertions[i].lastName }, insertions[i], {upsert:true, new: true}, function(err, user){
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