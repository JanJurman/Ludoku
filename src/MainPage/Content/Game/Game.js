require("./Game.scss");

function NavBar()
{
	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Game"]];
		this.nest = 
		[
			{tag: "div", attributes:  [["class", "info"]]},
			{tag: "div", attributes:  [["class", "windowContainer"]]}
		];
	}

	this.cleanUp =  function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new NavBar();