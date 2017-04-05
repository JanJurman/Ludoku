// POST(url, data, callback)
// {

// 	var xhttp = new XMLHttpRequest();
// 	if (callback != undefined)
// 	{
// 		xhttp.onreadystatechange = function()
// 		{
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				callback(this.responseText);
// 			}
// 		};
// 	}

// 	xhttp.open("POST", url);

// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xhttp.send(data);
// }
function Ajax()
{
	this.GET = function(url, callback)
	{
		var xhttp = new XMLHttpRequest();
		if (callback != undefined)
		{
			xhttp.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					callback(this.responseText);
				}
			};
		}


		// if (data != undefined)
		// {
		// 	xhttp.open('GET', url + "?" + data, true);
		// 	xhttp.send();
		// }
		// else
		// {
			xhttp.open('GET', url, true);
			xhttp.send();
		// }
	}

	this.POST = function(url, data, callback)
	{
		var xhttp = new XMLHttpRequest();
		if (callback != undefined)
		{
			xhttp.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					callback(this.responseText);
				}
			};
		}

		xhttp.open("POST", url);
		xhttp.setRequestHeader("Content-type", "application/json");


		xhttp.send(JSON.stringify(data));
	}
}

module.exports = new Ajax();