require("./Content.scss");

function Content()
{
	this.Profile = require('./Profile/Profile.js');

	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Content"]];
		this.nest = 
		[
			this.Profile
		];
	}
}

module.exports = new Content();