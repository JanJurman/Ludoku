function Ajax()
{
	this.getAsUriParameters = function(data) {
		var url = '?';
		for (var prop in data)
		{
			url += encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]) + '&';
		}
		return url.substring(0, url.length - 1)
	}

	//če pošiljamo poleg kake IDje/other data jih je treba dat v url, npr: /user/5e56h37s6234zq  => Ajax.GET("/user/" + userId)
	//data param je ignored (da nebote rabli istak GETof po kodi)
	this.GET = function(url, data, callback)
	{
		var xhttp = new XMLHttpRequest();
		if (callback)
		{
			xhttp.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					callback(this.responseText);
				}
			};
		}

		xhttp.open('GET', url, true);
		//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();
	}

	this.POST = function(url, data, callback)
	{
		var xhttp = new XMLHttpRequest();
		if (callback)
		{
			xhttp.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					callback(this.responseText);
				}
			};
		}

		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/json");

		if (data)
		{
			xhttp.send(JSON.stringify(data));
		}
		else
		{
			xhttp.send();
		}
	}
}

module.exports = new Ajax();