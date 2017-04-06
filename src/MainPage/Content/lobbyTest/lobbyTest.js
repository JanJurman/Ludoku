var Ajax = require('../../../Utils/Ajax.js');


function lobbyTest()
{
	this.myLobbyId = 0;

	this.createLobby = function()
	{
		var instance = this;
		Ajax.GET("/game/createLobby",null, function(res)
	    {
	      if(res.status == 200)
	      {
	        console.log("Lobby successfuly created.");
	      }
	    });
	}

	this.removeLobby = function()
	{
	  Ajax.GET("/game/removeLobby",null, function(res)
	    {
	      if(res.status == 200)
	      {
	        console.log("Lobby deleted.");
	      }
	    });
	}

	this.getLobbies = function()
	{
		Ajax.GET("/game/getLobbies",null, function(res)
	    {
	    	if(res === null)
	    	{
	    		console.log("No lobbies");
	    	}
	    	else
	    	{
	    		var temp = JSON.parse(res);
		      	console.log(temp);	    		
		      	instance.myLobbyId = "lobby."+temp[0].host; //nastavi lobby na svojega na ne retarded način
	    	}
	    });
	}

	this.setLobbyData = function()
	{
		Ajax.POST("/game/setLobbyParams", {"gameType" :"1v1", "difficulty" : "medium"}, function(res)
	    {
	    	console.log("We did it boiiis!!");
	    });	
	}

	this.getLobbyData = function()
	{
		Ajax.GET("/game/getLobbyParams", this.lobbyId, function(res)
	    {
	    	console.log(JSON.parse(res));
	    });			
	}

	this.init = function()
	{
	
		this.tag = "div";
		this.attributes = [["class", "lobbyTest"]];
		this.nest = 
		[
			{
				tag: "ul", 
				attributes: [["class", "info"]], 
				nest: 
				[
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.createLobby()'>Create lobby</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.getLobbies()'>Get lobies</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.removeLobby()'>Remove lobby</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.setLobbyData()'>Set lobby data</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.getLobbyData()'>Get lobby data</button>"}
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

module.exports = new lobbyTest();