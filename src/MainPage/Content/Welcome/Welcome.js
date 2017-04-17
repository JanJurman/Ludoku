require("./Welcome.scss");

function Welcome()
{
	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "intro"]];
		this.nest = 
		[
			{tag: "div", attributes: [["class", "boxfather"]], nest:
			[
				{tag: "div", attributes: [["class", "box"]], nest:
				[
					{tag: "h1", text: "Ludoku"},
					{tag: "p", text: "Play online sudoku with your friends or meet new ones while playing!!"}			
				]}			
			]}
		];
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new Welcome();