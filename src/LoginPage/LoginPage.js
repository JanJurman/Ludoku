require("./LoginPage.scss");
var Ajax = require("../Utils/Ajax.js");

function LoginPage()
{
	this.signUpState = 
	[
		{
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
									{tag:"li", attributes:[["class", "login"]], nest: [{tag: "a", attributes:[["href", "#/login"]], text:"Login"}]},{tag:"li", attributes:[["class", "register selected"]], nest: [{tag: "a", attributes:[["href", "#/signUp"]], text:"SignUp"}]}
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
		}
	];

	this.loginState = 
	[
		{
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
								{tag:"li", attributes:[["class", "login selected"]], nest: [{tag: "a", attributes:[["href", "#/login"]], text:"Login"}]},{tag:"li", attributes:[["class", "register"]], nest: [{tag: "a", attributes:[["href", "#/signUp"]], text:"SignUp"}]}
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
					attributes:[["class", "submitButton"], ["onclick", "window.LoginPage.logMeIn()"]],
					text:"Login"
				}
			]
		},
		{
			tag: "div",
			attributes: [["class", "info"]]
		}
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

	this.logMeIn = function(data)
	{
		// console.log(document.querySelector("#app .form .inputField:nth-child(2n) input").value);
		// console.log(document.querySelector("#app .form .inputField:nth-child(2n + 1) input").value);

		var send = {eMail: document.querySelector("#app .form .inputField:nth-child(2n + 1) input").value ,password: document.querySelector("#app .form .inputField:nth-child(2n) input").value};
		console.log(send);


		Ajax.POST("/user/login", send, function(data)
		{
			location.hash = "#/";
		});
	}

	this.giveLoginState = function()
	{
		document.querySelector("#app").innerHTML = this.toHtml(this.loginState);
	}

	this.giveSignUpState = function()
	{
		document.querySelector("#app").innerHTML = this.toHtml(this.signUpState);
	}
}

module.exports = new LoginPage();
