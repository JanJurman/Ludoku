function Globals()
{
	this.ip = 'localhost'
	this.port = '3000'
	this.ipAndPort = this.ip + ":" + this.port  // aka localhost:3000

	this.mongoIp = 'localhost'
	this.mongoPort = '27017'
	this.mongoPath = 'Ludoku' //only folder, no slash
	this.mongoURI = 'mongodb://' + this.mongoIp + ':' + this.mongoPort + '/' + this.mongoPath  // aka mongodb://localhost:27017/Ludoku
	
	this.redisPort = '5555'
	//redis IP je enak server ipju, ker teče znotraj node-a
}

module.exports = new Globals();