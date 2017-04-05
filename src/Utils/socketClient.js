function socketClient()
{
	this.io = require('socket.io-client');

	var instance = this;
	this.connect = function(){
		console.log("CONECTAM SE! SOCKETI")
		instance.socket = instance.io.connect('localhost:3000');

		//primer socket eventa
		//server pošle "hello", dobimo data
		instance.socket.on('hello', function (data) {
			console.log(data);
		});

		//tu pocamo vse socket evente, emit, send, on, ...
		instance.socket.on('notification', function (data){
			//server ti reče da morš si it po stuff preko routov
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
