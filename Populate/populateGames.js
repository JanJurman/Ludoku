
module.exports = function(mongoose, Schema) {
	var waitForFindByMail = function()
	{
		var insertions =
		[
			{players:
				[
					janez,
					nina,
					dmitry,
					ashley
				], type: 4, start: new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)"), finish: new Date("Mon Apr 03 2017 12:20:30 GMT+0200 (CEST)")},
			{players:
				[
					janez,
					nina
				], type: 2, start: new Date("Sun Apr 02 2017 9:32:14 GMT+0200 (CEST)"), finish: new Date("Sun Apr 02 2017 9:58:14 GMT+0200 (CEST)")},
			{players:
				[
					nina,
					janez
				], type: 2, start: new Date("Wed Apr 05 2017 16:22:30 GMT+0200 (CEST)"), finish: new Date("Wed Apr 05 2017 17:00:21 GMT+0200 (CEST)")},
			{players:
				[
					janez,
					nina
				], type: 2, start: new Date("Sat Apr 08 2017 12:00:00 GMT+0200 (CEST)"), finish: new Date("Sat Apr 08 2017 13:00:00 GMT+0200 (CEST)")},
			{players:
				[
					janez,
					nina
				], type: 2, start: new Date("Sat Apr 08 2017 13:20:00 GMT+0200 (CEST)"), finish: new Date("Sat Apr 08 2017 13:55:00 GMT+0200 (CEST)")},
			{players:
				[
					dmitry,
					janez
				], type: 2, start: new Date("Mon Apr 10 2017 8:23:00 GMT+0200 (CEST)"), finish: new Date("Mon Apr 10 2017 9:01:00 GMT+0200 (CEST)")},
			{players:
				[
					ashley,
					janez,
					dmitry
				], type: 3, start: new Date("Mon Apr 10 2017 10:12:00 GMT+0200 (CEST)"), finish: new Date("Mon Apr 10 2017 11:07:00 GMT+0200 (CEST)")},
			{players:
				[
					dmitry,
					janez
				], type: 2, start: new Date("Mon Apr 10 2017 14:08:00 GMT+0200 (CEST)"), finish: new Date("Mon Apr 10 2017 14:47:00 GMT+0200 (CEST)")},
			{players:
				[
					janez,
					dmitry
				], type: 2, start: new Date("Tue Apr 11 2017 17:34:00 GMT+0200 (CEST)"), finish: new Date("Tue Apr 11 2017 17:59:00 GMT+0200 (CEST)")},
			{players:
				[
					janez,
					nina
				], type: 2, start: new Date("Wed Apr 12 2017 09:11:00 GMT+0200 (CEST)"), finish: new Date("Wed Apr 12 2017 09:44:00 GMT+0200 (CEST)")},
			{players:
				[
					janez,
					dmitry
				], type: 2, start: new Date("Fri Apr 14 2017 12:22:00 GMT+0200 (CEST)"), finish: new Date("Fri Apr 14 2017 13:19:00 GMT+0200 (CEST)")},
			{players:
				[
					dmitry,
					ashley
				], type: 2, start: new Date("Tue Apr 04 2017 20:22:04 GMT+0200 (CEST)"), finish: new Date("Tue Apr 04 2017 21:00:17 GMT+0200 (CEST)")}

		];
		var Game = mongoose.model('game');
		for (var i = 0; i < insertions.length; ++i)
		{ //malo je hack ker ne gledaš by id, ampak je itak samo for testing
			//									condition,				inserting		idkItWorks		
			Game.findOneAndUpdate({ 'players': insertions[i].players, 'start': insertions[i].start, 'finish' : insertions[i].finish}, insertions[i], {upsert:true, new: true}, function(err, game){
				if(err)
				{
					console.log("Something went wrong:   "+ err);
				}
				else
				{
					console.log(game + "\n///////////////\n");
				}
			});
		}
	}
	


	var janez, nina, dmitry, ashley;
	var User = mongoose.model('user');
	User.findOne({ 'local.eMail': "janez.novak@gmail.com"}, function(err,user)
	{
		janez = user.id;
	});
	User.findOne({ 'local.eMail': "nina.novak@gmail.com"}, function(err,user)
	{
		nina = user.id;
	});
	User.findOne({ 'local.eMail': "dmitry.glukhovsky@gmail.com"}, function(err,user)
	{
		dmitry = user.id;
	});
	User.findOne({ 'local.eMail': "ashley.barrett@gmail.com"}, function(err,user)
	{
		ashley = user.id;
	});	

	setTimeout(waitForFindByMail, 500);
}