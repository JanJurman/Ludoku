require("./Game.scss");

function NavBar()
{
	this.gameId = null;

	this.fillSudokuGrid = function()
	{
		Ajax.GET("/game/getSudoku/"+this.gameId, null, function(res)
	    {
	    	var sudoku = JSON.parse(res).sudoku;
	       	console.log("Were In!");
	    	console.log(sudoku);
			var sudokuGrid = document.querySelector(".field");
			for(var i = 0; i < 9; ++i)
			{
				//dobi ul
				var ul = sudokuGrid.children[i];
				for(var j = 0; j < 9; ++j)
				{
					var li = ul.children[j];
					//li.innerHTML = sudoku[i*9 + j];
					if(sudoku[i*9 + j] == null)
					{
						li.innerHTML = " ";						
					}
					else
					{
						li.innerHTML = i*9 + j;
					}
				}	
			}

	    });
	}

	this.logicInit = function()
	{
		this.fillSudokuGrid();
	}

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
		this.logicInit();
	}

	this.cleanUp =  function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new NavBar();