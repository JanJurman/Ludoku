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
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li", attributes: [["class", "selected"]]},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]},
							{tag: "ul", nest: [{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"},{tag: "li"}]}
						]},
						{tag: "div", attributes: [["class", "controls"]], nest: 
						[
							{tag: "ul", attributes: [["class", "hoverable"]], nest: [{tag: "li", text: "1"},{tag: "li", text: "2"},{tag: "li", text: "3"},{tag: "li", text: "4"},{tag: "li", text: "5"},{tag: "li", text: "6"},{tag: "li", text: "7"},{tag: "li", text: "8"},{tag: "li", text: "9"}]}
						]}
					]}
				]}
			]}
		];
	}

	this.cleanUp =  function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new NavBar();