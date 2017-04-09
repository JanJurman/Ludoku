require("./Profile.scss");
require("../../../Loader.scss");

function Profile()
{

	this.index = 0;

	this.setUser = function(user)
	{
		this.nest[1].nest[0].text = user.firstName + " " +  user.lastName;
	}

	this.genGameList = function(atIndex, nm)
	{
		var data = [];

		for (var i = atIndex; i < (atIndex + nm) ; i++)
		{

			if (this.games[i])
			{

				var date = new Date(this.games[i].start);


				// console.log(this.games[i].players[0]);
				if (this.games[i].players[0] == window.loggedUser._id) 
				{
					data.push({tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: date.toLocaleDateString() + " - Won"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/win.svg"]]}]}]}]})
				}
				else
				{
					data.push({tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: date.toLocaleDateString() + " - Lost"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/cross.svg"]]}]}]}]})
				} 
			}
			else 
			{
				return data;
			}
		}

		return data;
	}

	this.init = function(user, games)
	{
		this.games = games;

		// console.log(games.length)

		// this.genGameList(0,11);
		


		this.tag = "div";
		this.attributes = [["class", "Profile"]];
		this.nest = 
		[
			{
				tag: "div", attributes: [["class", "basicInfo"]],
				nest:
				[
					{tag: "img", attributes: [["src", "svg/userMale.svg"]]},
					{tag: "ul", attributes: [["class", "infoList"]], nest:
					[
						{
							tag: "li",
							attributes: [["class", "firstLastName"]],
							text: user.firstName + " " + user.lastName
						},
						{
							tag: "li",
							attributes: [["class", "ocupation"]],
							text: "Feri student"
						},
						{
							tag: "li",
							attributes: [["class", "description"]],
							text: "Jaz sem največji cigan na svetu. Muy peligrosso. Kradem žlebe v svojem postem času. Damjan je moj najboljši prijatelj. Henčič pa je največji mojster majkemi."
						}
					]},
					{tag: "ul", attributes: [["class", "switchList"]], nest: 
					[
						{
							tag: "li",
							attributes: [["class", "gamesPlayedSwitch"]],
							nest: 
							[
								{tag: "img", attributes: [["src", "svg/game.svg"]]},
								{tag: "div", text: "Game history"}
							]
						},
						{
							tag: "li",
							attributes: [["class", "achievmentsSwitch"]],
							nest: 
							[
								{tag: "img", attributes: [["src", "svg/trophy.svg"]]},
								{tag: "div", text: "Achievments"}
							]
						},
						{
							tag: "li",
							attributes: [["class", "statisticsSwitch"]],
							nest: 
							[
								{tag: "img", attributes: [["src", "svg/chart.svg"]]},
								{tag: "div", text: "Statistics"}
							]
						}
					]}
				]
			},
			{
				tag: "div", attributes: [["class", "secondaryContent"]], nest: 
				[
					{tag: "div", attributes: [["class", "bannerWrapper"]], nest:
					[
						{
							tag: "h1", attributes: [["class", "banner"]], text: "Game list"	
						}
					]},
					{tag: "div",  attributes: [["class", "info"]], nest: 
					[
						{tag: "ul", nest: this.genGameList(0,5)},
						// {tag: "div", attributes: [["class", "loader2"]]}

					]},
					{tag: "div", attributes: [["class", "arrows"]], nest:
					[
						{tag: "div", nest: [{tag: "img", attributes: [["src", "svg/arrowGray.svg"], ["onclick", "window.MainPage.Content.Profile.back(this)"]]}]},
						{tag: "div", nest: [{tag: "img", attributes: [["src", "svg/arrow.svg"], ["onmouseover", "window.MainPage.Content.Profile.svg(this)"],["onclick", "window.MainPage.Content.Profile.next()"], ["onmouseleave", "window.MainPage.Content.Profile.svg1(this)"]]}]}
					]}
				]
			}
		];
		// this.setUser(user);
	}

	this.svg = function(toti)
	{
		toti.setAttribute("src", "svg/arrowHover.svg");
	}

	this.svg1 = function(toti)
	{
		toti.setAttribute("src", "svg/arrow.svg");
	}


	this.toHtml = function(data)
	{
		var html = "";
		for (var i = 0; i < data.length; ++i)
		{
			if (data[i].tag)
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
		}
		return html;
	}

	this.next = function()
	{
  		this.index += 5;
  		document.querySelector(".secondaryContent .info > ul").innerHTML = this.toHtml(this.genGameList(this.index, 5));
  		document.querySelector(".arrows div:nth-child(2n+1) > img").setAttribute("src", "svg/arrow.svg");
  		document.querySelector(".arrows div:nth-child(2n+1) > img").setAttribute("onmouseover", "window.MainPage.Content.Profile.svg(this)");
  		document.querySelector(".arrows div:nth-child(2n+1) > img").setAttribute("onmouseleave", "window.MainPage.Content.Profile.svg1(this)");

  		console.log(this.index >= this.games.size);

  		if (!this.games[this.index + 5])
  		{
  			document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("src", "svg/arrowGray.svg");
		  		document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("onmouseover", "");
		  		document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("onmouseleave", "");
		  		document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("onclick", "");
  		}
	}

	this.back = function()
	{
		if (this.index != 0)
		{
			// console.log("back");
			this.index -= 5;
			document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("src", "svg/arrow.svg");
		  		document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("onmouseover", "window.MainPage.Content.Profile.svg(this)");
		  		document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("onmouseleave", "window.MainPage.Content.Profile.svg1(this)");
		  		document.querySelector(".arrows div:nth-child(2n) > img").setAttribute("onclick", "window.MainPage.Content.Profile.next()");

			document.querySelector(".secondaryContent .info > ul").innerHTML = this.toHtml(this.genGameList(this.index, 5));
			if (this.index == 0)
			{
				document.querySelector(".arrows div:nth-child(2n+1) > img").setAttribute("src", "svg/arrowGray.svg");
		  		document.querySelector(".arrows div:nth-child(2n+1) > img").setAttribute("onmouseover", "");
		  		document.querySelector(".arrows div:nth-child(2n+1) > img").setAttribute("onmouseleave", "");
			}
		}
		// console.log("nekaj");
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new Profile();