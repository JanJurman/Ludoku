function Facebook()
{

	this.checkLoginState = function() 
	{
		FB.getLoginStatus(function(response)
		{
			if (response.status === 'connected') 
			{
				FB.api('/me', function(response)
				{

					Ajax.POST("/loginFacebook", response, function(data)
					{
						Ajax.GET("user/", null, function(data)
						{
							window.loggedUser = JSON.parse(data); 
							location.hash = "#/";
						});
					});
					// location.hash = "#/";

				});
			}
		});
	}


	this.init = function()
	{
		window.fbAsyncInit = function()
		{
			FB.init(
			{
				appId: '105721476642769',
				cookie: true,  			  
				xfbml: true,  
				version: 'v2.8' 
			});
		};
		(function(d, s, id) 
		{
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}


}

module.exports = new Facebook();