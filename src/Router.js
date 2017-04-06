Ajax = require('./Utils/Ajax.js');

function Router()
{
	this.routesData = {};
	this.homeLocation = "#/";
	this.loginLocation = "#/login";
	this.currentLoaction = "";


	this.routeToHome = function(location, SETTINGS, CALLBACK)
	{
		this.routeTo(location, SETTINGS, CALLBACK);
		this.homeLocation = "#" + location;
	}

	this.routeToLogin = function(location, SETTINGS, CALLBACK)
	{
		this.routeTo(location, SETTINGS, CALLBACK);
		this.loginLocation = "#" + location;
	}

	this.routeTo = function(location, SETTINGS, CALLBACK)
	{
		this.routesData["#" + location] = {callback: CALLBACK, settings: SETTINGS};
	}

	this.logic = function()
	{
		var route = location.hash;
		var toti = this;

		
		if (this.routesData[route])
		{
			if (this.currentLoaction != route)
			{	
				if (this.routesData[route].settings.require == "login")
				{
					Ajax.GET("user/isLoggedIn", null, function(data)
					{
						if (data != "false")
						{
							toti.currentLoaction = route;
							toti.routesData[route].callback();
						}
						else
						{
							route = toti.loginLocation;
							toti.currentLoaction = route;
							toti.routesData[toti.loginLocation].callback();
							location.hash = route;

						}
					});

				}
				else if (this.routesData[route].settings.require == "logout")
				{
					Ajax.GET("user/isLoggedIn", null,  function(data)
					{
						if (data == "false")
						{
							toti.currentLoaction = route;
							toti.routesData[route].callback();

						}
						else
						{
							route = toti.homeLocation;
							toti.currentLoaction = route;
							toti.routesData[toti.homeLocation].callback();
							location.hash = route;
						}
					});
				}
				location.hash = route;
			}
		}
		else
		{
			document.querySelector("#app").innerHTML = "404 BITCH";
			this.currentLoaction = location.hash;
		}
		
	}

	this.init = function()
	{
		var toti = this;
		window.onhashchange = function()
		{
			toti.logic();
		}
		window.onload = function()
		{
			toti.logic();
		};
	}
}

module.exports = new Router();