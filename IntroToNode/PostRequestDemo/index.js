/* post request practice */

var express = require('express');
var app = express();
var bodyParser = require("body-parser");

/* utility functions */
function logMessage(msg){
	console.log(msg + " is requested");
}

/* setup */
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
var friends = ["Tony", "Miranda", "Justin", "Louis"];

/* routing */

// main
app.get("/", function(req, res){
	logMessage("/");
	res.render("home");
});

// friends page
app.get("/friends", function(req, res){
	logMessage("friends");
	res.render("friends", {friends: friends});
});

// post friend
app.post("/addFriend", function(req, res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	logMessage("/addFriend");
	res.redirect("/friends");
});

/* listening the server */
app.listen(8000, function(){
	console.log("Server get started");
});