require("./LeaderBoard.scss");

function LeaderBoard()
{

	this.setLeaderBoard = function(user)
	{
		console.log("vhod v setLeaderBoard funkcijo");
		var temp = JSON.stringify(user);
		console.log(temp);
		var numberOfUsers = 5;				//user.length;
		for(var i = 0; i < numberOfUsers; ++i)
		{
			var uporabnik = {tag:"tr",nest:
								[
									{tag:"td", nest:[{tag:"a", attributes: [["href", ""]],text:user[i].firstName}]},
									{tag:"td",text:user[i].games},
									{tag:"td",text:user[i].gamesWon},
									{tag:"td",text:user[i].tournamentGames},
									{tag:"td",text:user[i].tournamentGamesWon}
								]
							};
			this.nest[1].nest.push(uporabnik);
		}
	}

	this.init = function(user)
	{
		//console.log("vhod v init funkcijo");
		//var test = JSON.stringify(user);
		//console.log(test);
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
							{tag: "th", nest:[{tag:"a", attributes: [["href", ""]],text: "Player" }]},
							{tag: "th", nest:[{tag:"a", attributes: [["href", ""]],text: "Games" }]},
							{tag: "th", nest:[{tag:"a", attributes: [["href", ""]],text: "GamesWon" }]},
							{tag: "th", nest:[{tag:"a", attributes: [["href", ""]],text: "TournamentGames" }]},
							{tag: "th", nest:[{tag:"a", attributes: [["href", ""]],text: "TournamentsWon" }]}
						]
					},

					/*{
						tag: "tr",
						nest:
						[
							{tag: "td", text: "Damjan"},
							{tag: "td", text: "15"},
							{tag: "td", text: "14" },
							{tag: "td", text: "3" },
							{tag: "td", text: "2" }
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
							{tag: "td", text: "2" }
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
							{tag: "td", text: "2" }
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
							{tag: "td", text: "2" }
						]
					}*/

				]
			}
		];
		this.setLeaderBoard(user);
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new LeaderBoard();