/* ejs demo 

	res.render(filename) : render the file (html)
*/

var express = require('express');
var app = express();

// serve the directory public
app.use(express.static("public"));
// ejs can be skipped when specifying the file path.
app.set("view engine", "ejs");

// utility function
function logMessage(msg){
	console.log(msg + " is requested");
}

/* route */
app.get("/", function(req, res){
	logMessage("/");
	res.render("home")
});

app.get("/fallInLoveWith/:thing", function(req, res){
	var thing = req.params.thing;
	logMessage("/fallInLoveWith/" + thing);
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
	logMessage("/posts");
	var posts = [
		{title: "Finding Nemo", author: "Susy"},
		{title: "Harry porter", author: "Kyle"},
		{title: "Lord of the ring", author: "Taku"}
	];

	res.render("posts", {posts: posts});
});

/* server */
app.listen(8000, function(){
	console.log("Server has been started");
})