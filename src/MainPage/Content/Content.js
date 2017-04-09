require("./Content.scss");

function Content()
{
	this.Profile = require('./Profile/Profile.js');
	this.LeaderBoard = require('./LeaderBoard/LeaderBoard.js');
	this.Game = require('./Game/Game.js');

	this.Lobbies = require('./Lobbies/Lobbies.js');

	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Content"]];
		this.nest = 
		[
			this.Profile,
			this.LeaderBoard,
			this.Lobbies,
			this.Game
		];
	}
}

module.exports = new Content();