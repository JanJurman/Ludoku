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
									{tag:"li", attributes:[["class", "login"], ["onclick", "window.LoginPage.switchLogin()"]], text:"Login"},{tag:"li", attributes:[["class", "register selected"], ["onclick", "window.LoginPage.switchToSignUp()"]], text: "Sign up"}
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
								{tag:"li", attributes:[["class", "login selected"], ["onclick", "window.LoginPage.switchLogin()"]], text:"Login"},{tag:"li", attributes:[["class", "register"], ["onclick", "window.LoginPage.switchToSignUp()"]], text: "Sign up"}
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
					attributes:[["class", "submitButton"]],
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

	this.init =  function()
	{
		if (location.hash == "#/signUp")
		{
			this.switchToSignUp();
		}
		else
		{
			this.switchLogin();
		}
	}

	this.switchLogin = function()
	{
		document.querySelector("#app").innerHTML = this.toHtml(this.loginState);
		location.hash = "/login";
	}

	this.switchToSignUp = function()
	{
		document.querySelector("#app").innerHTML = this.toHtml(this.signUpState);
		location.hash = "/signUp";
	}
}

module.exports = new LoginPage();
