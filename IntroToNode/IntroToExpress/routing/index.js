/* 
Routing example

	order of routes matters:
		 If the first routing works for every url, the next one does not work.
		 So wrongURLMessage should be called later
	
	route parameter
		: is a parameter
		ex) r/:redditname/comments/:id

*/

var express = require('express');
// now create a express object
var app = express();

function logMessage(url){
	console.log("someone required " + url + " request!");
}

function renderMessage(url, message){
	app.get(url, function(req, res){
		logMessage(url);
		res.send(message);
	});
};

function wrongURLMessage(){
	app.get("*", function(req, res){
		logMessage("wrong");
		res.send("This url does not exist.");
	});
}

// Router
// wrongURLMessage(); # not here
renderMessage("/", "Hi there!");
renderMessage("/bye", "good bye!");
renderMessage("/dog", "Meow!");

app.get("/dog/:types", function(req, res){
	var type = req.params.types 
	logMessage("dog/" + type)
	res.send(type + " : bow wow!!")
})

wrongURLMessage()

// Listen 
app.listen(8000, function(){
	console.log("Server started");
});