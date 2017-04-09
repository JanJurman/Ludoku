require("./Content.scss");

function Content()
{
	this.Profile = require('./Profile/Profile.js');
	this.LeaderBoard = require('./LeaderBoard/LeaderBoard.js');

	this.Lobbies = require('./Lobbies/Lobbies.js');

	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Content"]];
		this.nest = 
		[
			this.Profile,
			this.LeaderBoard,
			this.Lobbies
		];
	}
}

module.exports = new Content();