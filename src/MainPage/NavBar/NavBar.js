require("./NavBar.scss");

function NavBar()
{
	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "NavBar"]];
		this.nest = 
		[
			{
				tag: "ul",
				nest: 
				[
					{tag: "li", attributes: [["class", "floatLeft selected"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Home" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Chat" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", "#/LeaderBoard"]], text: "Leaderboard" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", "#/lobbies"]], text: "Play" }]},
					{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", "#/login"], ["onclick", "window.MainPage.NavBar.logMeOut()"]], text: "Logout" }]},
					{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", "#/profile"]], text: "Profile" }]}
				]
			}
		];
	}

	this.logMeOut =  function()
	{
		Ajax.POST("/user/logout", null, function()
		{
			window.loggedUser = null;	
		});
	}
}

module.exports = new NavBar();