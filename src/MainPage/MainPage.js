require("./MainPage.scss");

function MainPage()
{
	this.NavBar = require('./NavBar/NavBar.js');
	this.Content = require('./Content/Content.js');

	this.data = 
	[
		this.NavBar.data,
		this.Content.data
	];


	this.toHtml = function(data)
	{
		var html = "";
		for (var i = 0; i < data.length; ++i)
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
				html += this.toHtml(data[i].nest);
			}

			html += "</" + data[i].tag + ">";
		}
		return html;
	}

	this.init = function()
	{
		document.querySelector("#app").innerHTML = this.toHtml(this.data);
	}
}

module.exports = new MainPage();
