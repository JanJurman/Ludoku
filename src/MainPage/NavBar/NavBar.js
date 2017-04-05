require("./NavBar.scss");

function NavBar()
{
	this.data = 
	{
		tag: "div",
		attributes: [["class", "NavBar"]],
		nest: 
		[
			{
				tag: "ul",
				nest: 
				[
					{tag: "li", attributes: [["class", "floatLeft selected"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Home" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Chat" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Leaderboard" }]},
					{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Play" }]},
					{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Logout" }]},
					{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Profile" }]}
				]
			}
		]
	};
}

module.exports = new NavBar();