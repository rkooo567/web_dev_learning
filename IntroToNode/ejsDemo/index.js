/* ejs demo 

	res.render(filename) : render the file (html)
*/

var express = require('express');
var app = express();

// utility function
function logMessage(msg){
	console.log(msg + " is requested");
}

/* route */
app.get("/", function(req, res){
	logMessage("/");
	res.render("home.ejs")
});

app.get("/fallInLoveWith/:thing", function(req, res){
	var thing = req.params.thing;
	logMessage("/fallInLoveWith/" + thing);
	res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res){
	logMessage("/posts");
	var posts = [
		{title: "Finding Nemo", author: "Susy"},
		{title: "Harry porter", author: "Kyle"},
		{title: "Lord of the ring", author: "Taku"}
	];

	res.render("posts.ejs", {posts: posts});
});

/* server */
app.listen(8000, function(){
	console.log("Server has been started");
})