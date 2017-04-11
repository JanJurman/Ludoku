window.EntryPage = require('./EntryPage/EntryPage.js');
window.MainPage = require('./MainPage/MainPage.js');
window.Facebook = require('./Utils/Facebook.js')

require("./master.scss");
Router = require('./Router.js');
socketClient = require('./Utils/socketClient.js');
var Ajax = require("./Utils/Ajax.js");
var tmp = [];
var games;
var gamesWon;
var tournamentGames;
var tournamentsWon;

// ------ Shranim logged usera, oziroma null če ni logged------
Ajax.GET("user/isLoggedIn/", null, function(data)
{
	if(data != "false")
	{
		Ajax.GET("user/", null, function(data)
		{
			window.loggedUser = JSON.parse(data); 
		});
	}
	else
	{
		window.loggedUser = null;
	}
});


// ------------ Nea se ukvarjaj s tem -----------------------

function toHtml(data)
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
				html += toHtml(data[i].nest);
			}

			html += "</" + data[i].tag + ">";
		}
	}
	return html;
}

// ------------Very important--Must be defined--------------

Router.routeToHome("/", { require: "login" }, function()
{
	// socketClient.connect();
	window.MainPage.init();
	window.MainPage.NavBar.init();
	window.MainPage.NavBar.select("home");
	window.MainPage.Content.init();
	window.MainPage.Content.Profile.cleanUp();
	window.MainPage.Content.LeaderBoard.cleanUp();
	window.MainPage.Content.Game.cleanUp();


	document.querySelector("#app").innerHTML = toHtml(window.MainPage.data);
});

Router.routeToLogin("/login", { require: "logout" }, function()
{
	window.EntryPage.initLogin();
	document.querySelector("#app").innerHTML = toHtml(window.EntryPage.data);
});

Router.routeTo("/externalLogin", { require: "logout" }, function()
{
	window.EntryPage.initExternalLogin();
	window.Facebook.init();
	document.querySelector("#app").innerHTML = toHtml(window.EntryPage.data);
});

Router.routeTo404( function()
{
	// document.querySelector("#app").innerHTML = "Damjan je cigan";
	window.MainPage.init();
	window.MainPage.NavBar.init();
	window.MainPage.Content.init();
	window.MainPage.Content.Game.cleanUp();
});

// ----------------------------------------------------------

Router.routeTo("/signUp", { require: "logout" }, function()
{
	window.EntryPage.initSignUp();
	document.querySelector("#app").innerHTML = toHtml(window.EntryPage.data);
});

Router.routeTo("/profile", { require: "login" }, function()
{
	Ajax.GET("user/gamesAtPos/" + window.loggedUser._id + "/0/30", null, function(data)
	{
		window.MainPage.Content.LeaderBoard.cleanUp();
		window.MainPage.Content.Lobbies.cleanUp();
		window.MainPage.Content.Game.cleanUp();

		window.MainPage.init();
		window.MainPage.NavBar.init();
		window.MainPage.NavBar.select("profile");
		window.MainPage.Content.init();
		window.MainPage.Content.Profile.init(window.loggedUser, JSON.parse(data));
		document.querySelector("#app").innerHTML = toHtml(window.MainPage.data);
	});
});

Router.routeTo("/LeaderBoard", { require: "login" }, function()
{

	// ------ Dobi usere: Games ------		treba fixat to------------------------------------------------------
	//quick fix

	window.MainPage.Content.Profile.cleanUp();
	window.MainPage.Content.Game.cleanUp();

	Ajax.GET("leaderboard/games", null, function(data)
	{
		games = JSON.parse(data);

		Ajax.GET("leaderboard/gamesWon", null, function(data)
		{
			gamesWon = JSON.parse(data);

			Ajax.GET("leaderboard/tournamentGames", null, function(dat)
			{
				tournamentGames = JSON.parse(data);

				Ajax.GET("leaderboard/tournamentsWon", null, function(data)
				{
					tournamentsWon = JSON.parse(data);

					console.log(games+"GAMES");
					tmp.push(games);
					tmp.push(gamesWon);
					tmp.push(tournamentGames);
					tmp.push(tournamentsWon);

					console.log(tmp+"preden gre dalje");

					window.MainPage.init();
					window.MainPage.NavBar.init();
					window.MainPage.NavBar.select("leaderboard");
					window.MainPage.Content.init();
					window.MainPage.Content.LeaderBoard.init(tmp);

					document.querySelector("#app").innerHTML = toHtml(window.MainPage.data);
				});
			});

		});

	});	

});


Router.routeToHome("/game", { require: "logout" }, function()
{
	// socketClient.connect();
	window.MainPage.init();
	window.MainPage.NavBar.init();
	window.MainPage.NavBar.select("play");
	window.MainPage.Content.init();
	window.MainPage.Content.Game.init();

	window.MainPage.Content.Profile.cleanUp();
	window.MainPage.Content.LeaderBoard.cleanUp();
	window.MainPage.Content.Lobbies.cleanUp();


	document.querySelector("#app").innerHTML = toHtml(window.MainPage.data);
	window.MainPage.Content.Game.logicInit();
});


//TODO PAADREEEE FOOORGIIIVE ME
Router.routeTo("/lobbies", { require: "login" }, function()
{
	socketClient.connect();
	window.MainPage.init();
	window.MainPage.NavBar.init();
	window.MainPage.Content.init();
	window.MainPage.Content.Profile.cleanUp();
	window.MainPage.Content.LeaderBoard.cleanUp();
	window.MainPage.Content.Game.cleanUp();

	window.MainPage.Content.Lobbies.init();

	document.querySelector("#app").innerHTML = toHtml(window.MainPage.data);
});


Router.init();