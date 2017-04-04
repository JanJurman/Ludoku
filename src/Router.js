function Router()
{
	this.routesData = {};

	this.routeTo = function(location, HTML, SETTINGS, CALLBACK)
	{
		this.routesData["#" + location] = {html: HTML, callback: CALLBACK, settings: SETTINGS};
	}

	this.logic = function()
	{
		if (this.routesData[location.hash]) 
		{
			this.routesData[location.hash].callback();
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