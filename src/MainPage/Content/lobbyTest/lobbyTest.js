var Ajax = require('../../../Utils/Ajax.js');


function lobbyTest()
{
	this.myLobbyId = 0;

	this.createLobby = function()
	{
		var instance = this;
		Ajax.GET("/lobby/createLobby",null, function(res)
	    {
	      if(res.status == 200)
	      {
	        console.log("Lobby successfuly created.");
	      }
	    });
	}

	//DEPRECATED, se remova tudi ko vsie leavajo
	this.removeLobby = function()
	{
	  Ajax.GET("/lobby/removeLobby",null, function(res)
	    {
	      if(res.status == 200)
	      {
	        console.log("Lobby deleted.");
	      }
	    });
	}

	this.getLobbies = function()
	{
		var instance = this;
		Ajax.GET("/lobby/getLobbies",null, function(res)
	    {
	    	if(res === null)
	    	{
	    		console.log("No lobbies");
	    	}
	    	else
	    	{
	    		var temp = JSON.parse(res);
		      	console.log(temp);
		      	
		      	////////////////////////////////////////////
		      	//TODO: to je samo za testing, da je prvi lobi tisti s katerim interactaš
		      	///////////////////////////////////////////
		      	if(temp[0]){
		      		instance.myLobbyId = "lobby."+temp[0].host; //nastavi lobby na svojega na ne retarded način
	    		}
	    	}
	    });
	}

	//only host can do this
	this.setLobbyData = function()
	{
		Ajax.POST("/lobby/setLobbyParams", {"gameType" :"1v1", "difficulty" : "medium"}, function(res)
	    {
	    	console.log("We did it boiiis!!");
	    });	
	}

	this.getLobbyData = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/getLobbyParams/" + lobbyID, null, function(res)
	    {
	    	console.log(JSON.parse(res));
	    });			
	}

	this.joinLobby = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/joinLobby/" + lobbyID, null, function(res)
	    {
	    	// no op
	    });				
	}

	this.leaveLobby = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/leaveLobby/" + lobbyID, null, function(res)
	    {
	    	// no op
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
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.getLobbyData()'>Get lobby data</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.joinLobby()'>Join Lobby</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.lobbyTest.leaveLobby()'>Leave Lobby</button>"}
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