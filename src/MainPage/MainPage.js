require("./MainPage.scss");

function MainPage()
{
	this.NavBar = require('./NavBar/NavBar.js');
	this.Content = require('./Content/Content.js');

	this.init = function()
	{
		this.data = 
		[
				this.NavBar,
				this.Content,
				{tag: "div", attributes: [["class", "grayScreen"]], nest: 
				[
					{tag: "div", nest: [{tag: "img", attributes:[["src", "svg/1st.svg"]]}]}, {tag: "div", text: "You win!"}
				]}
		];
	}

	this.nekajTestam = function()
	{
		console.log("nekaj");
		document.querySelector(".grayScreen").className += " visibleGrayScreen";
	}

	this.nekajTestam1 = function()
	{
		console.log("nekaj");
		// document.querySelector(".grayScreen").className -= " visibleGrayScreen";
		document.querySelector(".grayScreen").classList.remove("visibleGrayScreen");
	}
}

module.exports = new MainPage();
