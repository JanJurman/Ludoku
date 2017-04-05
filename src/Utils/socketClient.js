function socketClient()
{
	this.io = require('socket.io-client');

	var instance = this;
	this.connect = function(){
		console.log("CONECTAM SE! SOCKETI")
		instance.socket = instance.io.connect('localhost:3000');

		//tu pošamo vse socket evente, emt, send, on, ...
		instance.socket.on('hello', function (data) {
			console.log(data);
		});

	}


	this.test = function (name){
		instance.socket.emit('testEmit', name , function (data) {
	  		console.log(data);
		});
	}

}


sc = new socketClient();

module.exports = sc;
