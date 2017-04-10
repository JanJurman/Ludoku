require("./Game.scss");

function NavBar()
{
	this.init = function()
	{
		this.tag = "div";
		this.attributes = [["class", "Game"]];
		this.nest = 
		[
			{tag: "div", attributes: [["class", "bannerWrapper"]], nest:
			[
				{tag: "h1", attributes: [["class", "banner"]], text: "Tournament"}

			]},
			{tag: "div", attributes:  [["class", "windowContainer"]], nest: 
			[
			
				{tag: "div", attributes:  [["class", "info"]], nest:
				[
					{tag: "div", attributes: [["class", "timer"]], text: "00:00"},

					{tag: "div", attributes: [["class", "players"]], nest: 
					[
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}

						]},
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}

						]},
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}

						]},
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}

						]},
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}

						]},
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}

						]},
						{tag: "div", attributes: [["class", "playerDescriptor"]], nest:[
							{tag: "div", attributes: [["class", "name"]], text: "Janez Novak"},
							{tag: "div", attributes: [["class", "progress"]] , nest: [{tag: "div"}, {tag: "span", text: "50%"}]}
						]}

					]}
				]},
				{tag: "div", attributes: [["class", "window"]], nest: 
				[
					{tag: "div", attributes: [["class", "sudoku"]], nest: 
					[
						{tag: "div", attributes: [["class", "field"]], nest: 
						[
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]},
							{tag: "ul", nest: [{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"},{tag: "li", text: "1"}]}
						]},
						{tag: "div", attributes: [["class", "controls"]], nest: 
						[
							{tag: "ul", attributes: [["class", "hoverable"]], nest: [{tag: "li", text: "1"},{tag: "li", text: "2"},{tag: "li", text: "3"},{tag: "li", text: "4"},{tag: "li", text: "5"},{tag: "li", text: "6"},{tag: "li", text: "7"},{tag: "li", text: "8"},{tag: "li", text: "9"}]}
						]}
					]}
				]}
			]}
		];

		var toti = this;

		window.onkeydown = function(e)
		{
			toti.interceptKeys(e);
		}

		window.onkeyup = function(e)
		{
			toti.interceptKeyRelase(e);
		}
	}

	this.interceptKeys = function(e)
	{
		if (e.keyCode == 49)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(1)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 50)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(2)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 51)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(3)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 52)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(4)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 53)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(5)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 54)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(6)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 55)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(7)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 56)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(8)").setAttribute("class", "selected");
		}
		else if (e.keyCode == 57)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(9)").setAttribute("class", "selected");
		}
	}

	this.interceptKeyRelase = function(e)
	{
		if (e.keyCode == 49)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(1)").setAttribute("class", "");
		}
		else if (e.keyCode == 50)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(2)").setAttribute("class", "");
		}
		else if (e.keyCode == 51)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(3)").setAttribute("class", "");
		}
		else if (e.keyCode == 52)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(4)").setAttribute("class", "");
		}
		else if (e.keyCode == 53)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(5)").setAttribute("class", "");
		}
		else if (e.keyCode == 54)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(6)").setAttribute("class", "");
		}
		else if (e.keyCode == 55)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(7)").setAttribute("class", "");
		}
		else if (e.keyCode == 56)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(8)").setAttribute("class", "");
		}
		else if (e.keyCode == 57)
		{
			document.querySelector(".Game .controls > ul > li:nth-child(9)").setAttribute("class", "");
		}
	}

	this.cleanUp =  function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new NavBar();