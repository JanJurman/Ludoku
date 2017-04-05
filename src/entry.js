window.LoginPage = require('./LoginPage/LoginPage.js');
window.MainPage = require('./MainPage/MainPage.js');
require("./master.scss");
Router = require('./Router.js');
socketClient = require('./Utils/socketClient.js');

// ------------Very important--Must be defined--------------

Router.routeToHome("/", "", { require: "logout" }, function()
{
	socketClient.connect();
	window.MainPage.init();
});

Router.routeToLogin("/login", "", { require: "logout" }, function()
{
	window.LoginPage.giveLoginState();
});

// ----------------------------------------------------------

Router.routeTo("/signUp", "", { require: "logout" }, function()
{
	window.LoginPage.giveSignUpState();
});

Router.routeTo("/ples", "", { require: "login" }, function()
{
	console.log("nekaj");
});


Router.init();