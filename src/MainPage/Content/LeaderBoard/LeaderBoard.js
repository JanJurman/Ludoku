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

		for(var i = 0; i < 4; ++i)
		{
			var naslovH1;
			var uporabniki;

			if(i == 0)
			{
				naslovH1 = {tag: "h1", nest: 
				[
					{tag: "svg", attributes: [["class", "ico-cup"]]},
					{tag: "use", attributes: [["xlink:href:", "#cup"]]}
				], text: "Most games played"};
			}
			else if(i == 1)
			{
				naslovH1 = {tag: "h1", nest: 
				[
					{tag: "svg", attributes: [["class", "ico-cup"]]},
					{tag: "use", attributes: [["xlink:href:", "#cup"]]}
				], text: "Most games won"};
			}
			else if(i == 2)
			{
				naslovH1 = {tag: "h1", nest: 
				[
					{tag: "svg", attributes: [["class", "ico-cup"]]},
					{tag: "use", attributes: [["xlink:href:", "#cup"]]}
				], text: "Most tournaments played"};				
			}
			else if(i == 3)
			{
				naslovH1 = {tag: "h1", nest: 
				[
					{tag: "svg", attributes: [["class", "ico-cup"]]},
					{tag: "use", attributes: [["xlink:href:", "#cup"]]}
				], text: "Most tournaments won"};				
			}

			uporabniki = {tag:"ol", nest: []};

			for(var j = 0; j < 5; ++j)
			{
				console.log(user[i][j].lastName+"imeeeeeeMoje");
				var uporabnik;

				if(i == 0)
				{
					uporabnik = {tag:"li", nest:[{tag:"em", text: user[i][j].firstName + " " + user[i][j].lastName}, {tag:"strong", text:user[i][j].games}]};
				}
				else if(i == 1)
				{
					uporabnik = {tag:"li", nest:[{tag:"em", text: user[i][j].firstName + " " + user[i][j].lastName}, {tag:"strong", text:user[i][j].gamesWon}]};
				}
				else if(i == 2)
				{
					uporabnik = {tag:"li", nest:[{tag:"em", text: user[i][j].firstName + " " + user[i][j].lastName}, {tag:"strong", text:user[i][j].tournamentGames}]};
				}
				else if(i == 3)
				{
					uporabnik = {tag:"li", nest:[{tag:"em", text: user[i][j].firstName + " " + user[i][j].lastName}, {tag:"strong", text:user[i][j].tournamentsWon}]};
				}
				uporabniki.nest.push(uporabnik);
			}


			var section = {tag:"section", attributes:[["class", "players"]], nest:[naslovH1, uporabniki]};
			this.nest[1].nest.push(section);
		}

	}
	
	this.init = function(user)
	{
		//design naredi
		this.tag = "div";
		this.attributes = [["class", "LeaderBoard"]];
		this.nest = 
		[
			{tag: "div", attributes: [["class", "bannerWrapper"]], nest:
			[
				{
					tag: "h1", attributes: [["class", "banner"]], text: "LeaderBoard"	
				}
			]},

			{tag: "div", nest:
			[
				{tag:"section", attributes: [["class", "players"]], nest:
					[
						
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