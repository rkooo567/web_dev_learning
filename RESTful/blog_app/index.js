/* 
	Blog app is an app that you can update the information of bunch of blogs. 
	It has the function of 
		1. create a new blog information
		2. update the blog information
		3. delete the blog information

	We are going to use RESTful route to implement those functions

*/

// library
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose'); 
var util       = require('./util/util');

// App config
var app = express();
app.set('view engine', 'ejs'); // when specifying a file name, ejs is not needed 
app.use(express.static("public")); // public folder is 
app.use(bodyParser.urlencoded({extended: true}));

// database config
mongoose.connect("mongodb://localhost/blog_app");
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: 
		{
			type: Date, 
			default: Date.now
		}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTful route

// Home
app.get("/", function(req, res){
	util.logRequestMessage("/", "GET");
	res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if (err){
			console.error(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// listen to the server
app.listen(8000, function(){
	console.log("Blog app server has been started");
})