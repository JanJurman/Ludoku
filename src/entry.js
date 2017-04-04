window.LoginPage = require('./LoginPage/LoginPage.js');
window.MainPage = require('./MainPage/MainPage.js');
require("./master.scss");

Router = require('./Router.js');

Router.routeTo("/", "", { require: "login" }, function()
{
	window.MainPage.init();
});

Router.routeTo("/signUp", "", { require: "logout" }, function()
{
	window.LoginPage.giveSignUpState();
});

Router.routeTo("/login", "", { require: "logout" }, function()
{
	window.LoginPage.giveLoginState();
});

Router.init();