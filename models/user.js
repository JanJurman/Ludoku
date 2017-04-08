var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema
(
	{
		local: {
			eMail: String,
			passwordHash: String,
			dateOfBirth: String,
			sex: String
		},
		facebook: {
			id: String,
		},

		firstName: String,
		lastName: String,
		games: Number,
		tournamentGames: Number,
		gamesWon: Number,
		tournamentsWon: Number
	}
);

userSchema.methods.maskData = function maskData()
{
	this.local.eMail = undefined;
	this.local.passwordHash = undefined;
	this.facebook.id = undefined;
	return this;
};

userSchema.methods.leaderboardGames = function leaderboardGames()
{
	return {"_id":this.id, "firstName":this.firstName, "lastName":this.lastName, "games": this.games, "gamesWon": this.gamesWon, "tournamentGames": this.tournamentGames, "tournamentsWon": this.tournamentsWon};
};
userSchema.methods.leaderboardTournamentGames = function leaderboardTournamentGames()
{
	return {"_id":this.id, "firstName":this.firstName, "lastName":this.lastName, "games": this.games, "gamesWon": this.gamesWon, "tournamentGames": this.tournamentGames, "tournamentsWon": this.tournamentsWon};
};
userSchema.methods.leaderboardGamesWon = function leaderboardGamesWon()
{
	return {"_id":this.id, "firstName":this.firstName, "lastName":this.lastName, "games": this.games, "gamesWon": this.gamesWon, "tournamentGames": this.tournamentGames, "tournamentsWon": this.tournamentsWon};
};
userSchema.methods.leaderboardTournamentsWon = function leaderboardTournamentsWon()
{
	return {"_id":this.id, "firstName":this.firstName, "lastName":this.lastName, "games": this.games, "gamesWon": this.gamesWon, "tournamentGames": this.tournamentGames, "tournamentsWon": this.tournamentsWon};
};

mongoose.model('user', userSchema);