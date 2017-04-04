var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema
(
	{
		eMail: String,
		passwordHash: String,
		firstName: String,
		lastName: String,
		dateOfBirth: String,
		sex: String,
		games: Number,
		tournamentGames: Number,
		gamesWon: Number,
		tournamentsWon: Number
	}
);

mongoose.model('user', userSchema);