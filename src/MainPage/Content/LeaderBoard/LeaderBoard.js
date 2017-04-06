require("./LeaderBoard.scss");

function LeaderBoard()
{
	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "LeaderBoard"]];
		this.nest = 
		[
			{
				tag: "p",
				attributes: [["class", "podNaslov"]],
				text: "LeaderBoard"
			},
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
		];
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new LeaderBoard();