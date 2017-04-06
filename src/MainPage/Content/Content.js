require("./Content.scss");

function Content()
{
	this.Profile = require('./Profile/Profile.js');
	this.LeaderBoard = require('./LeaderBoard/LeaderBoard.js');
	//TODO REMOVE ME LATER 
	this.lobbyTest = require('./lobbyTest/lobbyTest.js');

	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Content"]];
		this.nest = 
		[
			this.Profile,
			this.LeaderBoard,
			this.lobbyTest
		];
	}
}

module.exports = new Content();