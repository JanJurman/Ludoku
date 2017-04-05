require("./Content.scss");

function Content()
{
	this.data = 
	{
		tag: "div",
		attributes: [["class", "Content"]],
		nest: 
		[
			{
				tag: "div",
				attributes: [["class", "Profile"]],
				nest: 
				[
					{tag: "img", attributes: [["src", "svg/userMale.svg"]]},
					{
						tag: "ul", 
						attributes: [["class", "info"]], 
						nest: 
						[
							{tag: "li", attributes: [["class", "name"]] , text: "Janez Novak"},
							{tag: "li", text: "Born - 12.12.1994"},
							{tag: "li", text: "Male"},
							{tag: "li", text: "Played 12 normal games"},
							{tag: "li", text: "Won 6"},
							{tag: "li", text: "Played 5 tournament games"},
							{tag: "li", text: "Won 3"}
						]
					}
				]
			}
		]
	};
}

module.exports = new Content();