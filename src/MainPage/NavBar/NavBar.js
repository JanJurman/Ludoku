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
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", "#/welcome"]], text: "Home" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Chat" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", "#/LeaderBoard"]], text: "Leaderboard" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", "#/lobbies"]], text: "Play" }]},
					{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", "#/login"], ["onclick", "window.MainPage.NavBar.logMeOut()"]], text: "Logout" }]},
					{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", "#/profile"]], text: "Profile" }]}
				]
			}
		];
	}

	this.select = function(menuItem)
	{
		if (menuItem == "home")
		{
			this.nest[0].nest[0].attributes[0][1] = "floatLeft selected";
		}
		else if (menuItem == "profile")
		{
			this.nest[0].nest[5].attributes[0][1] = "floatRight selected";
		}
		else if(menuItem == "leaderboard")
		{
			this.nest[0].nest[2].attributes[0][1] = "floatLeft selected";	
		}
		else if (menuItem == "play")
		{
			this.nest[0].nest[3].attributes[0][1] = "floatLeft selected";	
		}
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