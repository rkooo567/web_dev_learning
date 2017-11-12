/* 
	Movie search program
*/

var request = require('request');
var express = require('express');

/* setupt */
var app = express();
app.set("view engine", "ejs");

/* routing */

// main
app.get("/", function(req, res){
	res.render("search");
})

// results page
app.get("/results", function(req, res){
	// request movie db API
	var movie = req.query.searchedMovie;
	var requestURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=thewdb"
	request(requestURL, function(error, response, body){
		if (error){
			console.error(error);
		} else if (!error && response.statusCode == 200){ // If API request is succeed
			parsedMoiveInfo = JSON.parse(body);
			res.render("results", {parsedMoiveInfo: parsedMoiveInfo});
		}
	});
});

/* Listening server */
app.listen(8000, function(){
	console.log("Server get started");
});