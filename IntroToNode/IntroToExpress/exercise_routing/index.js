/* Exercise to understnad routing */

var express = require('express');
var app = express();


// utility function
function logMessage(url){
	console.log(url + " is requested");
};

/* ===================================================
				routing
======================================================*/

// main page
app.get("/", function(req, res){
	logMessage("/")
	res.send("Hi there, welcom to my assignemnt!")
});

// animal sound
app.get("/speak/:animal", function(req, res){
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!"
	}
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
	res.send("The " + animal + " says '" + sound + "'");
});

// repeat words
app.get("/repeat/:msg/:times", function(req, res){
	var msg = req.params.msg;
	var times = Number(req.params.times);
	var returnMessage = "";
	logMessage("/repeat/" + msg + "/" + times);
	for (var i = 0; i < times; i++){
		returnMessage = returnMessage + msg + "\n";
	}
	res.send(returnMessage);
});

// wrong url
app.get("*", function(req, res){
	res.send("Error: wrong url required")
})

/* ===============================================
				listening server
===================================================*/

app.listen(8000, function(){
	console.log("Exercise server has been started")
})