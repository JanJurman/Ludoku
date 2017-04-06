require("./Content.scss");

function Content()
{
	this.Profile = require('./Profile/Profile.js');
	this.LeaderBoard = require('./LeaderBoard/LeaderBoard.js');

	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Content"]];
		this.nest = 
		[
			this.Profile,
			this.LeaderBoard

		];
	}
}

module.exports = new Content();