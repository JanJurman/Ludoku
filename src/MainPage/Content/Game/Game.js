require("./Game.scss");
var socketClient = require('../../../Utils/socketClient.js')

function NavBar()
{
	this.gameId = null;

	this.sendSudoku = function()
	{
		//get sudoku from grid
		var sudoku = []
		var sudokuGrid = document.querySelector(".field");
			for(var i = 0; i < 9; ++i)
			{
				//dobi ul
				var ul = sudokuGrid.children[i];
				for(var j = 0; j < 9; ++j)
				{
					var li = ul.children[j];
					if(li.innerHTML == " "){
						sudoku.push(null)
					}else{
						sudoku.push(parseInt(li.innerHTML))
					}
				}	
			}

			//send ajax
			Ajax.POST("/game/submitSudoku", {sudoku: sudoku, gameId: this.gameId}, null)
	}

	this.fillSudokuGrid = function(id = this.gameId)
	{
		Ajax.GET("/game/getSudoku/"+id, null, function(res)
	    {
	    	var res = JSON.parse(res)
	    	if(res.sudoku){
		    	var sudoku = res.sudoku;
		       	// console.log("Were In!");
		    	// console.log(sudoku);
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
							li.innerHTML = sudoku[i*9 + j];
							//naredi unselectable
							li.setAttribute("class", "unselectable");
						}
					}	
				}
			}else if(res.finished){
				//res.finished je zaporedna številka, kateri si bil
				console.log("YAY, bil si " + res.finished)
			}
	    });
	}

	this.cheat = function(sudokuSolution)
	{
		var sudokuGrid = document.querySelector(".field");
		for(var i = 0; i < 9; ++i)
		{
			//dobi ul
			var ul = sudokuGrid.children[i];
			for(var j = 0; j < 9; ++j)
			{
				var li = ul.children[j];
				//li.innerHTML = sudoku[i*9 + j];
				if(sudokuSolution[i*9 + j] == null)
				{
					li.innerHTML = " ";						
				}
				else
				{
					li.innerHTML = sudokuSolution[i*9 + j];
					//naredi unselectable
					//li.setAttribute("class", "unselectable");
				}
			}	
		}
	}

	this.getGameProgress = function(gameId){
		//ajaxaj si game progress in ga baci v progress bare
		Ajax.GET("/game/getGameProgress/"+gameId, null, function(res)
	    {
	    	var members = JSON.parse(res)
	    	// console.log(res)
	    });
	}

	this.logicInit = function()
	{
		//socketClient events:
		socketClient.addAction('/game/getGameProgress', this.getGameProgress)
		socketClient.addAction('/game/getSudoku', this.fillSudokuGrid)

		var instance = this
		this.fillSudokuGrid();

		//dajmo vsem lijem onckick
		var sudokuGrid = document.querySelector(".field");
		for(var i = 0; i < 9; ++i)
		{
			//dobi ul
			var ul = sudokuGrid.children[i];
			for(var j = 0; j < 9; ++j)
			{
				var li = ul.children[j];
				li.onclick = function(){
					var x = document.querySelector(".field .selected")
					if(x)
						x.setAttribute("class", "")
					if(!instance.hasClass(this, "unselectable")){
						this.setAttribute("class", "selected");
					}
				}
			}	
		}
	}

	this.hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
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
		var code = e.keyCode
		if(code >= 49 && code <= 57){
			var num = code - 48
			document.querySelector(".Game .controls > ul > li:nth-child(" + num + ")").setAttribute("class", "selected");
			//selected liju daj cifro not
			var sel = document.querySelector(".field .selected")
			if(sel){
				sel.innerHTML = num
				//send sudoku to be evaled
				this.sendSudoku()
			}
		}
		else if(code == 48){ //nula
			var sel = document.querySelector(".field .selected")
			if(sel){
				sel.innerHTML = " "
			}
		}
	}

	this.interceptKeyRelase = function(e)
	{
		var code = e.keyCode
		if(code >= 49 && code <= 57){
			var num = code - 48
			document.querySelector(".Game .controls > ul > li:nth-child(" + num + ")").setAttribute("class", "");
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