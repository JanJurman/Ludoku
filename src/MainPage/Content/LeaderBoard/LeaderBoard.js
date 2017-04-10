require("./LeaderBoard.scss");

function LeaderBoard()
{

	this.setLeaderBoard = function(user)
	{
		//razberi po čem so sortani useri

		console.log("vhod v setLeaderBoard funkcijo");
		var temp = JSON.stringify(user);
		console.log(temp);
		var numberOfUsers = 5;				//user.length;
		for(var i = 0; i < numberOfUsers; ++i)
		{
			var uporabnik = {tag:"tr",nest:
								[
									{tag:"td", nest:[{tag:"a", attributes: [["href", "#/profile"]],text:user[i].firstName + " " +user[i].lastName}]}/*,
									//{tag:"td", attributes:["onclick", "window.MainPage.Content.LeaderBoard.viewProfile(user[i].id)"],text:user[i].firstName},
									{tag:"td",text:user[i].games},
									{tag:"td",text:user[i].gamesWon},
									{tag:"td",text:user[i].tournamentGames},
									{tag:"td",text:user[i].tournamentsWon}*/
								]
							};
			this.nest[1].nest.push(uporabnik);
		}
	}

	this.init = function(user)
	{
		//design naredi
		this.tag = "div";
		//this.attributes = [["class", "LeaderBoard"]];
		this.nest = 
		[
			{tag: "div", attributes: [["class", "bannerWrapper"]], nest:
			[
				{
					tag: "h1", attributes: [["class", "banner"]], text: "LeaderBoard"	
				}
			]},
			/*{
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

				]
			}*/
			{tag: "div", nest:
			[
				{tag:"section", attributes: [["class", "players"]], nest:
					[
						
						{tag:"h1", nest:[ 
							{tag: "svg", attributes: [["class", "ico-cup"]]},
							{tag: "use", attributes: [["xlink:href", "#cup"]]}
						], text:"Most active players"},
						
					
						{tag:"ol", nest:
							[
								{tag:"li", nest:
									[
										{tag:"em", text: "Burrito Peligroso"},
										{tag:"strong", text: "315"}
									]
								},
								{tag:"li", nest:
									[
										{tag:"em", text: "Nacho Casa"},
										{tag:"strong", text: "1112"}
									]
								},
								{tag:"li", nest:
									[
										{tag:"em", text: "John Doe"},
										{tag:"strong", text: "122"}
									]
								}

							]
						}
					]
				}
			]}


		];
		this.setLeaderBoard(user);
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}

	this.viewProfile = function(ajdi)
	{
		 console.log(ajdi+"hahahahahahahahahahahahahahah");
	}
}

module.exports = new LeaderBoard();