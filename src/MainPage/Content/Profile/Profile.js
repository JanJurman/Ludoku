require("./Profile.scss");
require("../../../Loader.scss");

function Profile()
{

	this.setUser = function(user)
	{
		this.nest[1].nest[0].text = user.firstName + " " +  user.lastName;
	}

	this.init = function()
	{
	
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
							text: "Janez Novak"
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
						{tag: "h1", attributes: [["class", "banner"]], text: "Game list"}
					]},
					{tag: "div",  attributes: [["class", "info"]], nest: 
					[
						{tag: "ul", nest: 
						[
							{tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: "12.12.1994 - Won"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/win.svg"]]}]}]}]},
							{tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: "12.12.1994 - Lost"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/cross.svg"]]}]}]}]},
							{tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: "12.12.1994 - Won"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/win.svg"]]}]}]}]},
							{tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: "12.12.1994 - Lost"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/cross.svg"]]}]}]}]},
							{tag: "li" , nest: [{tag: "div", nest: [{tag: "div", text: "12.12.1994 - Lost"}, {tag: "div", nest: [{tag: "img", attributes: [["src", "svg/cross.svg"]]}]}]}]},
							// {tag: "div", attributes: [["class", "loader2"]]}
						]},
						{tag: "div", nest:
						[
							{tag: "div", nest: [{tag: "img", attributes: [["src", "svg/arrowGray.svg"]]}]},
							{tag: "div", nest: [{tag: "img", attributes: [["src", "svg/arrow.svg"], ["onmouseover", "window.MainPage.Content.Profile.svg(this)"],["onclick", "window.MainPage.Content.Profile.next()"], ["onmouseleave", "window.MainPage.Content.Profile.svg1(this)"]]}]}
						]}
					]},
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

	this.next = function()
	{
		// console.log("nekaj");


		var op = 0.1;  // initial opacity
    	// element.style.display = 'block';
    	var element = document.querySelector(".secondaryContent .info > ul > li");

    	for (var i = 0; i < element.length; i++)
    	{
   		 var timer = setInterval(function ()
   		 {
	        if (op >= 1)
	        {
	            clearInterval(timer);
	        }

	        element[i].style.opacity = op;
	        element[i].style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op += op * 0.1;
    	}); 
    	}

	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new Profile();