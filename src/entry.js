window.LoginPage = require('./LoginPage/LoginPage.js');
window.MainPage = require('./MainPage/MainPage.js');
require("./master.scss");

if (location.hash == "#/")
{
	window.MainPage.init();
}
else if (location.hash == "#/signUp")
{
	window.LoginPage.init();
}
else if (location.hash == "#/login")
{
	window.LoginPage.init1();
}