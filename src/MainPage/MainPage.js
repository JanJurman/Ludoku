require("./MainPage.scss");

function MainPage()
{
	this.NavBar = require('./NavBar/NavBar.js');
	this.Content = require('./Content/Content.js');

	this.init = function()
	{
		this.data = 
		[
				this.NavBar,
				this.Content
		];
	}
}

module.exports = new MainPage();
