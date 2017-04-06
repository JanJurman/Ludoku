require("./LeaderBoard.scss");

function LeaderBoard()
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
						{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Home" }]},
						{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Chat" }]},
						{tag: "li", attributes: [["class", "floatLeft selected"]], nest: [{ tag: "a", attributes: [["href", "localhost:3000/#/Leaderboard"]], text: "Leaderboard" }]},
						{tag: "li", attributes: [["class", "floatLeft"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Play" }]},
						{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Logout" }]},
						{tag: "li", attributes: [["class", "floatRight"]], nest: [{ tag: "a", attributes: [["href", ""]], text: "Profile" }]}
					]
				}
			]
		},

		

	];

	this.Naslov = 
	[
		{
			/*tag: "p",
			attributes: [["class", "Naslov"]],
			text: "LeaderBoard"	*/

			tag: "p",
			attributes: [["class", "podNaslov"]],
			text: "LeaderBoard"
		}		
	];

//nest: [{tag: "p", attributes: [["class", "podNaslov"]], text: "Games" }]
	this.Tabela =
	[
{
			tag: "table",
			attributes: [["class", "tabela"]],
			nest:
			[
				{
					tag: "tr",
					nest:
					[
						{tag: "th", text: "Player"},
						{tag: "th", text: "Games"},
						{tag: "th", text: "GamesWon" },
						{tag: "th", text: "TournamentGames" },
						{tag: "th", text: "TournamentGamesWon" },
						{tag: "th", text: "isLoggedIn" }
					]
				},

				{
					tag: "tr",
					nest:
					[
						{tag: "td", text: "Damjan"},
						{tag: "td", text: "15"},
						{tag: "td", text: "14" },
						{tag: "td", text: "3" },
						{tag: "td", text: "2" },
						{tag: "td", text: "Yes" }
					]
				},

				{
					tag: "tr",
					nest:
					[
						{tag: "td", text: "Henčič"},
						{tag: "td", text: "15"},
						{tag: "td", text: "14" },
						{tag: "td", text: "3" },
						{tag: "td", text: "2" },
						{tag: "td", text: "No" }
					]
				},

				{
					tag: "tr",
					nest:
					[
						{tag: "td", text: "Jurman"},
						{tag: "td", text: "15"},
						{tag: "td", text: "14" },
						{tag: "td", text: "3" },
						{tag: "td", text: "2" },
						{tag: "td", text: "Yes" }
					]
				},

				{
					tag: "tr",
					nest:
					[
						{tag: "td", text: "Vračko"},
						{tag: "td", text: "15"},
						{tag: "td", text: "14" },
						{tag: "td", text: "3" },
						{tag: "td", text: "2" },
						{tag: "td", text: "No" }
					]
				}

			]
		}
	]

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
		//document.querySelector("#app").innerHTML = this.toHtml(this.NavBar);
		document.querySelector("#app").innerHTML = this.toHtml(this.navBar) + this.toHtml(this.Naslov) + this.toHtml(this.Tabela);
	}
}

module.exports = new LeaderBoard();