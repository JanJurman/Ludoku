var Ajax = require('../../../Utils/Ajax.js');
var socketClient = require('../../../Utils/socketClient.js')

require("./Lobbies.scss");

function Lobbies()
{
	this.myLobbyId = 0;
	var instance = this

	this.createLobby = function()
	{
		Ajax.GET("/lobby/createLobby",null, function(res)
	    {
			// console.log("Lobby successfuly created: " + res);
			//then join
			
			instance.joinLobby(res)
			instance.getLobbyData(res)
	    });
	}

	//DEPRECATED, se remova tudi ko vsi leavajo
	this.removeLobby = function()
	{
	  Ajax.GET("/lobby/removeLobby",null, function(res)
	    {
	        // console.log("Lobby deleted.");
	    });
	}

	//zaradi race conditionov...
	this.getPlayerThenCallFunction = function(lobby, callback)
	{
		Ajax.GET("/user/"+lobby.host, null, function(res,error)
		{
			if(!error)
			{
				callback(lobby,JSON.parse(res));
			}
			else
			{
				callback(lobby, {firstName: "Anon", lastName:""}); //just to be sure?
			}
		});	
	}

	// za vse lobby membere dobi podatke
	this.getPlayersThenCallFunction = function(lobby, callback)
	{
		var users = new Array();
		instance.getUsersRec(users, lobby, callback);
	}

	// za ene callback madness, za druge elegant solution   edit: holy fuck delalo je sprve
	this.getUsersRec = function(users, lobby, callback)
	{
		Ajax.GET("/user/"+lobby.members[users.length], null, function(res,error)
		{
			if(!error)
			{
				users.push(JSON.parse(res));
				if(users.length === lobby.members.length)
				{
					callback(lobby,users);
				}
				else
				{
					instance.getUsersRec(users,lobby,callback);
				}
			}
			else //TODO
			{
				callback(lobby, {firstName: "Anon", lastName:""});
			}
		});
	}

	this.getLobbies = function()
	{
		Ajax.GET("/lobby/getLobbies",null, function(res)
	    {
	    	instance.clearLobbiesDiv()
	    	if(res === null)
	    	{
	    		// console.log("No lobbies");
	    	}
	    	else
	    	{
	    		var lobbies = JSON.parse(res);
	    		if(lobbies[0] == null){
	    			return;
	    		}
		      	// console.log(lobbies);
		      	
		    	lobbies.forEach(function(item, index){
		    		//tukaj mores noter iskat player imena zaradi race conditions

		    		instance.getPlayerThenCallFunction(item, instance.addLobbytoLobbiesDiv)
		    		// instance.addLobbytoLobbiesDiv(item)
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
	this.addLobbytoLobbiesDiv = function(lobby,host){
		lobbiesDiv = document.querySelector("#lobbiesList");
		lobbiesDiv.innerHTML += "<div class='lobbiesListEntry'>"+"Host: "+host.firstName+" "+host.lastName+"</br>" + "Game type: " + lobby.gameType + "</br> Difficulty: " + lobby.difficulty + 
							"</br>Players: "+lobby.members.length+"</br><button onclick='window.MainPage.Content.Lobbies.joinLobby(\"lobby." + lobby.host + "\")' >Join</button>" + 
							"</div>";
	}

	//only host can do this
	this.setLobbyData = function(gameType, difficulty)
	{
		Ajax.POST("/lobby/setLobbyParams", {"gameType" :gameType, "difficulty" : difficulty}, function(res)
	    {
	    	// console.log("We did it boiiis!!");
	    	instance.getLobbyData();
	    });
	}

	this.getLobbyData = function(lobbyID = this.myLobbyId)
	{
		// console.log("GET LOBBY DATA")
		Ajax.GET("/lobby/getLobbyParams/" + lobbyID, null, function(res)
	    {
	    	lobby = JSON.parse(res)
	    	// console.log("Getting lobby params:");
	    	// console.log(lobby);
	    	instance.getPlayersThenCallFunction(lobby, instance.showLobbyDiv);
	    });
	}

	this.joinLobby = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/joinLobby/" + lobbyID, null, function(res)
	    {
	    	instance.myLobbyId = lobbyID;
	    	console.log("JOINED")
			//instance.getLobbies() // posodobi lobi list (npr ti hostaš lobi pa stisneš join drugemu)
			document.querySelector("#leaveButton").style.display = 'inline-block'
			document.querySelector("#currentLobby").style.display = ''; //prikazi lobby

	    });
	}

	//ko klikne host v options Set poslemo na server
	this.setLobbyDataClick = function()
	{
		var difficultySelect = document.querySelector("#difficultySelect");
		var gameTypeSelect = document.querySelector("#gameTypeSelect");

		var selectedDifficulty = difficultySelect.options[difficultySelect.selectedIndex].value;
		var selectedGameType = gameTypeSelect.options[gameTypeSelect.selectedIndex].value;

		//pls work
		Ajax.POST("/lobby/setLobbyParams", {"gameType" :selectedGameType, "difficulty" : selectedDifficulty}, function(res)
		{
			instance.getLobbyData();
		});
	}

	this.showLobbyDiv = function(lobby, users){
		lobbyDiv = document.querySelector("#currentLobby");
		lobbyDiv.style.display = 'block';

		//če smo host lahko spreminjamo podatke
		if(window.loggedUser._id === lobby.host)
		{
			document.querySelector("#settingsDiv").style.display = 'block';
			document.querySelector("#startGameButton").style.display = 'inline-block';
		}

		document.querySelector("#hostNameDiv").innerHTML = users[0].firstName+ " " + users[0].lastName + "'s " + "lobby";
		document.querySelector("#gameTypeDiv").innerHTML = "Game type: "+lobby.gameType;
		document.querySelector("#difficultyDiv").innerHTML = "Difficulty: "+lobby.difficulty;
		var str = ""
		users.forEach(function(item,index){
			str += item.firstName + " " + item.lastName + ", ";
		})
		str = str.slice(0, - 2); 
		document.querySelector("#membersDiv").innerHTML = "Members: "+str;

	}

	this.clearLobbyDiv = function(){
		lobbyDiv = document.querySelector("#currentLobby");
		document.querySelector("#hostNameDiv").innerHTML = "";
		document.querySelector("#gameTypeDiv").innerHTML = "Game type: ";
		document.querySelector("#difficultyDiv").innerHTML = "Difficulty: ";
		document.querySelector("#membersDiv").innerHTML = "Members: ";
		lobbyDiv.style.display = 'none'
		// lobbyDiv.innerHTML = ""
	}

	this.leaveLobby = function(lobbyID = this.myLobbyId)
	{
		Ajax.GET("/lobby/leaveLobby/" + lobbyID, null, function(res)
	    {
	    	instance.myLobbyId = null;
	    	instance.clearLobbyDiv();
	    	console.log("LEFT")
	    });	
	}

	this.startGame = function(){
		Ajax.GET("/game/startGame", null, function(res)
	    {
	    	//instance.myLobbyId = null;
	    	instance.clearLobbyDiv();
	    	// console.log("game start ajax sent!")
	    	//socket server pol obvesti vse lobby memberje, da se naj redirectajo na /#/game
	    });	
	}

	this.redirectToGame = function(gameId)
	{
		setTimeout(function(){
			window.MainPage.Content.Game.gameId = gameId;
			window.location.href = "#/game";	
		}, 1000);
	}

	this.init = function()
	{
		//add posible actions to socketClient:
		socketClient.addAction("/lobby/getLobbyParams", this.getLobbyData)
		socketClient.addAction("/lobby/getLobbies", this.getLobbies)
		socketClient.addAction("/lobby/leaveLobby", this.leaveLobby)
		socketClient.addAction("#GAMESTART", this.redirectToGame)
	

		this.tag = "div";
		this.attributes = [["class", "Lobbies"]];
		this.nest = 
		[
			// {
			// 	tag: "ul", 
			// 	attributes: [["class", "testingList"]], 
			// 	nest: 
			// 	[
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.createLobby()'>Create lobby</button>"},
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.getLobbies()'>Get lobies</button>"},
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.removeLobby()'>Remove lobby</button>"},
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.setLobbyData(\"1v1\", \"medium\")'>Set lobby data</button>"},
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.getLobbyData()'>Get lobby data</button>"},
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.joinLobby()'>Join Lobby</button>"},
			// 		{tag: "li", attributes: [["class", "name"]] , text: "<button onclick='window.MainPage.Content.Lobbies.leaveLobby()'>Leave Lobby</button>"}

					
			// 	]
			// },

			{tag: "div", attributes: [["class", "bannerWrapper"]], nest:
			[
				{tag: "h1", attributes: [["class", "banner"]], text: "Lobbies"}
			]},



			{tag: "div", attributes: [["id", "lobbyParent"]], 

			nest:
			[

			
			{tag: "div", attributes: [["id", "lobbiesListParent"]],
			nest:
			[
				{tag: "div", attributes: [["id", "createLobbyDiv"]],
				nest:
				[
					{tag: "button", attributes: [["id", "createLobbyButton"], ["onclick",'window.MainPage.Content.Lobbies.createLobby()']] , text: "Create lobby"},	
				]
				},
				{tag: "div", attributes: [["id", "lobbiesList"]]}
			]
			},

			{
				tag: "div", attributes: [["id", "currentLobby"]], 
				nest:
				[
					{tag: "div", attributes: [["id", "hostNameDiv"]], text: "Currently not in a lobby."},
					
					{tag: "div", attributes: [["id", "settingsDiv"], ["class", "lobbyDataDiv"]],
					nest:
					[
						{tag: "img", attributes: [["id", "settingsSvg"], ["src", "svg/settings.svg"]]},
						{tag: "div", attributes: [["id", "renderSettingsDiv"]],
						nest:
						[
							{tag: "select", attributes: [["id", "difficultySelect"]],
							nest: 
							[
								{tag: "option", attributes: [["value", "Easy"]], text: "Easy"},
								{tag: "option", attributes: [["value", "Medium"]], text: "Medium"}, //god help tistemu, ki bo hoto kaj spremenit tu not
								{tag: "option", attributes: [["value", "Hard"]], text: "Hard"}
							]},
							{tag: "select", attributes: [["id", "gameTypeSelect"]],
							nest:
							[
								{tag: "option", attributes: [["value", "Solo"]], text: "Solo"},
								{tag: "option", attributes: [["value", "1v1"]], text: "1v1"},
								{tag: "option", attributes: [["value", "8FFA"]], text: "8FFA"},
								{tag: "option", attributes: [["value", "Tournament"]], text: "Tournament"}
							]},
							{tag: "button", attributes: [["onclick",'window.MainPage.Content.Lobbies.setLobbyDataClick()'], ["id", "setLobbyDataButton"]],  text: "Set"}
						]}

					]},

					{tag: "div", attributes: [["id", "gameTypeDiv"], ["class", "lobbyDataDiv"]], text: ""},
					{tag: "div", attributes: [["id", "difficultyDiv"], ["class", "lobbyDataDiv"]], text: ""},
					{tag: "div", attributes: [["id", "membersDiv"], ["class", "lobbyDataDiv"]], text: ""},
					{tag: "button", attributes: [["onclick",'window.MainPage.Content.Lobbies.leaveLobby()'], ["id", "leaveButton"]],  text: "Leave"},
					{tag: "button", attributes: [["onclick",'window.MainPage.Content.Lobbies.startGame()'], ["id", "startGameButton"]], text : "Start Game"}
				]
			},
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