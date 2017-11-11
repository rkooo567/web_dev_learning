/* 
The first application that is made by the framework express.js 
	
 	"/" => "Hi there!
 	"/bye" => "good bye!"
 	"/dog" => "Meow!"

*/

var express = require('express');
// now create a express object
var app = express();

function renderMessage(url, message){
	app.get(url, function(req, res){
		console.log("someone required " + url + " request!")
		res.send(message);
	});
};

// Router
renderMessage("/", "Hi there!");
renderMessage("/bye", "good bye!");
renderMessage("/dog", "Meow!");

// Listen 
app.listen(8000, function(){
	console.log("Server started");
});