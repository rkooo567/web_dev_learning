/* 
	HTTP request for using API
*/

// setup
var request = require("request");

// main program
request('http://www.gdfoogle.com', function(err, res, body){
	if (err){
		console.error(err);
	} else if (!err && res.statusCode == 200){
		console.log("request succeed");
		console.log(body);
	}
});