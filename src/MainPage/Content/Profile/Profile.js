require("./Profile.scss");

function Profile()
{

	this.setUser = function(user)
	{
		this.nest[1].nest[0].text = user.firstName + " " +  user.lastName;
	}

	this.init = function(user)
	{
	
		this.tag = "div";
		this.attributes = [["class", "Profile"]];
		this.nest = 
		[
			{tag: "img", attributes: [["src", "svg/userMale.svg"]]},
			{
				tag: "ul", 
				attributes: [["class", "info"]], 
				nest: 
				[
					{tag: "li", attributes: [["class", "name"]] , text: "Cigan"},
					{tag: "li", text: "Born - 12.12.1994"},
					{tag: "li", text: "Male"},
					{tag: "li", text: "Played 12 normal games"},
					{tag: "li", text: "Won 6"},
					{tag: "li", text: "Played 5 tournament games"},
					{tag: "li", text: "Won 3"}
				]
			}
		];
		this.setUser(user);
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new Profile();