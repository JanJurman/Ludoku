var globals = require('../../globals.js')
var Ajax = require('./Ajax.js')

function socketClient()
{
	this.io = require('socket.io-client');
	this.actions = []

	var instance = this;
	this.connect = function(){
		console.log("CONECTAM SE! SOCKETI")
		instance.socket = instance.io.connect(globals.ipAndPort);

		//primer socket eventa
		//server pošle "hello", dobimo data
		instance.socket.on('hello', function (data) {
			console.log(data);
		});

		//tu pocamo vse socket evente, emit, on, ...
		instance.socket.on('notification', function (data){
			//server ti reče da morš si it po stuff preko route
			//glede na route bomo še tu mogli dodatne odločitve sprejemat, glede kazanja stuffa na websajtu
			console.log(data);
			if(data.type == "GET")
			{
				//poglej v actions in routu poišči pripadajoč action
				var found = false;
				instance.actions.forEach(function(item, index){
					if(item[0] == data.route){
						console.log("najden action, route:" + data.route + ", data: " + data.data)
						item[1](data.data)
						found = true;
					}

				});
				if(!found)
				{
					console.log("action ni bil najden")
					console.log("route:" + data.route + ", data: " + data.data + " type: " + data.type)
					//otherwise do this for dev purposes
					Ajax.GET(data.route + "/" + data.data, null, function(resp){
						console.log(resp)
						if(resp != "OK"){
							var obj = JSON.parse(resp);
							// poglej v actions in

						}
					});
				}
			}
			
		});

	}


	this.test = function (name){
		instance.socket.emit('testEmit', name , function (data) {
	  		console.log(data);
		});
	}


	this.addAction = function(route, action){
		var el = [route, action]
		if(this.actions.indexOf(el) == -1){
			this.actions.push(el)
		}
	}

}


sc = new socketClient();

module.exports = sc;
