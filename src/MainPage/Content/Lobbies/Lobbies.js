var Ajax = require('../../../Utils/Ajax.js');

var socketClient = require('../../../Utils/socketClient.js')

function Lobbies()
{
	this.myLobbyId = 0;
	var instance = this

	this.createLobby = function()
	{
		Ajax.GET("/lobby/createLobby",null, function(res)
	    {
			console.log("Lobby successfuly created: " + res);
			//then join
			
			instance.joinLobby(res)
			instance.getLobbyData(res)
	    });
	}

	//DEPRECATED, se remova tudi ko vsie leavajo
	this.removeLobby = function()
	{
	  Ajax.GET("/lobby/removeLobby",null, function(res)
	    {
	        console.log("Lobby deleted.");
	    });
	}

	this.getLobbies = function()
	{
		Ajax.GET("/lobby/getLobbies",null, function(res)
	    {
	    	instance.clearLobbiesDiv()
	    	if(res === null)
	    	{
	    		console.log("No lobbies");
	    	}
	    	else
	    	{
	    		var lobbies = JSON.parse(res);
	    		if(lobbies[0] == null){
	    			return;
	    		}
		      	console.log(lobbies);
		      	
		    	lobbies.forEach(function(item, index){
		    		instance.addLobbytoLobbiesDiv(item)
		    	})

		      	////////////////////////////////////////////
		      	//TODO: to je samo za testing, da je prvi lobi tisti s katerim interactaš
		      	////////////////////////////////////////////
		      	if(lobbies[0]){
		      		instance.myLobbyId = "lobby."+lobbies[0].host; //nastavi lobby na svojega na ne retarded način
	    		}
	    	}
	    });
	}
	this.clearLobbiesDiv = function(){
		document.querySelector("#lobbiesList").innerHTML = "";
	}
	this.addLobbytoLobbiesDiv = function(lobby){
		lobbiesDiv = document.querySelector("#lobbiesList");
		lobbiesDiv.innerHTML += "<div style='border: 2px solid red;'>" + "Game type: " + lobby.gameType + "</br> Difficulty: " + lobby.difficulty + 
							"</br><button onclick='window.MainPage.Content.Lobbies.joinLobby(\"lobby." + lobby.host + "\")' >JOIN</button>" + 
							"</div>";
	}

	//only host can do this
	this.setLobbyData = function(gameType, difficulty)
	{
		Ajax.POST("/lobby/setLobbyParams", {"gameType" :gameType, "difficulty" : difficulty}, function(res)
	    {
	    	console.log("We did it boiiis!!");
	    });
	}

	this.getLobbyData = function(lobbyID = this.myLobbyId)
	{
		console.log("GET LOBBY DATA")
		Ajax.GET("/lobby/getLobbyParams/" + lobbyID, null, function(res)
	    {
	    	lobby = JSON.parse(res)
	    	console.log(lobby);

	    	instance.showLobbyDiv(lobby)
	    });
	}

	this.joinLobby = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/joinLobby/" + lobbyID, null, function(res)
	    {
	    	instance.myLobbyId = lobbyID;
	    	console.log("JOINED")

	    });
	}

	this.showLobbyDiv = function(lobby){
		lobbyDiv = document.querySelector("#lobbyImIn");
		var str = "<div style='border: 2px solid blue;'>" + "Game type: " + lobby.gameType + "</br> Difficulty: " + lobby.difficulty + 
							"</br> Members: "
		lobby.members.forEach(function(item,index){
			str += item + ", "
		})
		str += "</br><button onclick='window.MainPage.Content.Lobbies.leaveLobby(\"lobby." + lobby.host + "\")' >LEAVE</button>" + "</div>";

		lobbyDiv.innerHTML = str;
	}

	this.clearLobbyDiv = function(){
		lobbyDiv = document.querySelector("#lobbyImIn");
		lobbyDiv.innerHTML = ""
	}

	this.leaveLobby = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/leaveLobby/" + lobbyID, null, function(res)
	    {
	    	// no op
	    	instance.myLobbyId = null;
	    	instance.clearLobbyDiv();
	    	console.log("LEFT")
	    });	
	}

	this.init = function()
	{
		//add posible actions to socketClient:
		socketClient.addAction("/lobby/getLobbyParams", this.getLobbyData)
		socketClient.addAction("/lobby/getLobbies", this.getLobbies)
		socketClient.addAction("/lobby/leaveLobby", this.leaveLobby)
	
		this.tag = "div";
		this.attributes = [["class", "Lobbies"]];
		this.nest = 
		[
			{
				tag: "ul", 
				attributes: [["class", "info"]], 
				nest: 
				[
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.createLobby()'>Create lobby</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.getLobbies()'>Get lobies</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.removeLobby()'>Remove lobby</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.setLobbyData(\"1v1\", \"medium\")'>Set lobby data</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.getLobbyData()'>Get lobby data</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.joinLobby()'>Join Lobby</button>"},
					{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.leaveLobby()'>Leave Lobby</button>"},
					{tag: "div", attributes: [["id", "lobbiesList"]], text: "tu bojo lobbiji" },
					{tag: "div", attributes: [["id", "lobbyImIn"]], text: "LOBBY KO SM NOT" }
					
				]
			}
		];


		//get exsting lobbies
		this.getLobbies();
	}

	this.cleanUp = function()
	{
		this.tag = null;
		this.attributes = null;
		this.nest = null;
	}
}

module.exports = new Lobbies();