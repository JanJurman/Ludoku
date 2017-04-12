require("./EntryPage.scss");
var Ajax = require("../Utils/Ajax.js");

function EntryPage()
{
	this.signUpState = 
	[{
		tag: "div",
		attributes: [["class", "form"]],
		nest:
			[
				{
					tag:"div",
					attributes:[["class", "switch"]],
					nest:
					[
						{
							tag: "ul",
							nest:
							[
								{tag:"li", attributes:[["class", "login"]], nest: [{tag: "a", attributes:[["href", "#/login"]], text:"Login"}]},{tag:"li", attributes:[["class", "externalLogin"]], nest: [{tag: "a", attributes:[["href", "#/externalLogin"]], text:"External login"}]},{tag:"li", attributes:[["class", "register selected"]], nest: [{tag: "a", attributes:[["href", "#/signUp"]], text:"SignUp"}]}
							]
						}
					]
				},
				{
					tag:"div",
					attributes:[["class", "title"]],
					text:"Sign up"
				},
				{
					tag:"div",
					attributes:[["class", "inputFields"]],
					nest:[
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "text"], ["placeholder", "E-mail"]]}] },
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "password"], ["placeholder", "Password"]]}] },
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "password"], ["placeholder", "Retype password"]]}] },
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "text"], ["placeholder", "First name"]] }]},
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "text"], ["placeholder", "Last name"]] }]},
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "date"], ["placeholder", "Date of birth"]] }]},
						{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"select", nest: [{tag: "option" ,attributes:[["value", "M"]], text: "Male"}, {tag: "option", attributes:[["value", "F"]], text: "Female"}, {tag: "option", attributes:[["value", "X"]], text: "Other"}] }]}
					]
				},
				{
					tag:"button",
					attributes:[["class", "submitButton"]],
					text:"Submit"
				}
			]
	},
	{
		tag: "div",
		attributes: [["class", "info"]]
	}];

	this.loginState = 
	[{
		tag: "div",
		attributes: [["class", "form"]],
		nest:
		[
			{
				tag:"div",
				attributes:[["class", "switch"]],
				nest:
				[
					{
						tag: "ul",
						nest:
						[
							{tag:"li", attributes:[["class", "login selected"]], nest: [{tag: "a", attributes:[["href", "#/login"]], text:"Login"}]},{tag:"li", attributes:[["class", "externalLogin"]], nest: [{tag: "a", attributes:[["href", "#/externalLogin"]], text:"External login"}]},{tag:"li", attributes:[["class", "register"]], nest: [{tag: "a", attributes:[["href", "#/signUp"]], text:"SignUp"}]}
						]
					}
				]
			},
			{
				tag:"div",
				attributes:[["class", "title"]],
				text:"Welcome back"
			},
			{
				tag:"div",
				attributes:[["class", "inputFields"]],
				nest:[
					{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "text"], ["placeholder", "E-mail"]]}] },
					{ tag:"div", attributes:[["class", "inputField"]], nest: [{ tag:"input", attributes:[["type", "password"], ["placeholder", "Password"]]}] }
				]
			},
			{
				tag:"button",
				attributes:[["class", "submitButton"], ["onclick", "window.EntryPage.logMeIn()"]],
				text:"Login"
			}
		]
	},
	{
		tag: "div",
		attributes: [["class", "info"]]
	}];

	this.externalLoginState = 
	[{
		tag: "div",
		attributes: [["class", "form"]],
		nest:
		[
			{
				tag:"div",
				attributes:[["class", "switch"]],
				nest:
				[
					{
						tag: "ul",
						nest:
						[
							{tag:"li", attributes:[["class", "login"]], nest: [{tag: "a", attributes:[["href", "#/login"]], text:"Login"}]},{tag:"li", attributes:[["class", "externalLogi selected"]], nest: [{tag: "a", attributes:[["href", "#/externalLogin"]], text:"External login"}]},{tag:"li", attributes:[["class", "register"]], nest: [{tag: "a", attributes:[["href", "#/signUp"]], text:"SignUp"}]}
						]
					}
				]
			},
			{
				tag:"div",
				attributes:[["class", "title"]],
				text:"Welcome back"
			},
			{
				tag:"div",
				text: '<fb:login-button scope="public_profile,email" onlogin="window.Facebook.checkLoginState();"></fb:login-button>'
			}
		]
	},
	{
		tag: "div",
		attributes: [["class", "info"]]
	}];

	this.logMeIn = function(data)
	{
		var send = {eMail: document.querySelector("#app .form .inputField:nth-child(2n + 1) input").value ,password: document.querySelector("#app .form .inputField:nth-child(2n) input").value};

		Ajax.POST("user/login", send, function(data)
		{
			Ajax.GET("user/", null, function(data)
			{
				window.loggedUser = JSON.parse(data); 
				location.hash = "#/";
			});
		});
	}

	this.initLogin = function()
	{
		this.data = this.loginState;
	}

	this.initExternalLogin = function()
	{
		this.data = this.externalLoginState;
	}

	this.initSignUp = function()
	{
		this.data = this.signUpState;
	}
}

module.exports = new EntryPage();
