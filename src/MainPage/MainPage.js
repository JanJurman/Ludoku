require("./MainPage.scss");

function MainPage()
{
	this.navBar = 
	[
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
		}
	];

	this.toHtml = function(data)
	{
		var html = "";
		for (var i = 0; i < data.length; ++i)
		{
			html += "<" + data[i].tag;
			if (data[i].attributes) 
			{
				for (var j = 0; j < data[i].attributes.length; j++)
				{
					html +=  " " + data[i].attributes[j][0] + "='" + data[i].attributes[j][1] + "'";
				}
			}
			html += ">";

			if (data[i].text)
			{
				html += data[i].text;
			}

			if (data[i].nest != undefined)
			{
				html += this.toHtml(data[i].nest);
			}

			html += "</" + data[i].tag + ">";
		}
		return html;
	}

	this.init = function()
	{
		document.querySelector("#app").innerHTML = this.toHtml(this.navBar);
	}
}

module.exports = new MainPage();
