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

		if (data !== null)
		{	
			//TODO IZBOLJŠAJ DA POŠLEŠ VEČ PARAMETROV 

			xhttp.open('GET', url + "/" + data, true);
		}
		else
		{
			xhttp.open('GET', url, true);
		}
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