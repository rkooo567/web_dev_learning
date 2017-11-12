/* 
	Request weather API
*/

// setup
var request = require("request");
var hawaiiSunsetTime = ""

// main program
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
	, function(err, res, body){
	if (err){
		console.error(err);
	} else if (!err && res.statusCode == 200){
		var parsedData = JSON.parse(body)
		hawaiiSunsetTime = parsedData.query.results.channel.astronomy.sunset;
	}
});

