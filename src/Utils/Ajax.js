function Ajax()
{
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

		if (data)
		{
			xhttp.send(JSON.stringify(data));
		}
		else
		{
			xhttp.open('GET', url, true);
			xhttp.send();
		}
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