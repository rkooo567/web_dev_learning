/* 
	Blog app is an app that you can update the information of bunch of blogs. 
	It has the function of 
		1. create a new blog information
		2. update the blog information
		3. delete the blog information

	We are going to use RESTful route to implement those functions

*/

// library
var express          = require('express');
var bodyParser       = require('body-parser'); // you should use it
var mongoose         = require('mongoose'); 
var util             = require('./util/util'); 
var methodOverride   = require('method-override'); // you should use it
var expressSanitzier = require("express-sanitizer"); // you should use it. It removes script tag when evaluated

// App config
var app = express();
app.set('view engine', 'ejs'); // when specifying a file name, ejs is not needed 
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitzier());
app.use(methodOverride("_method"));

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
	util.logRequestMessage("/blogs", "GET");
	Blog.find({}, function(err, blogs){
		if (err){
			console.error(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW
app.get("/blogs/new", function(req, res){
	util.logRequestMessage("/blogs/new", "GET");
	res.render("new");
});

// CREATE POST ROUTE
app.post("/blogs", function(req, res){
	util.logRequestMessage("/blogs", "POST");
	// sanitize the input
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if (err){
			res.render("new");
		} else {
			// redirect
			res.redirect("/blogs");
		}
	});

});

// SHOW: show one particular item
app.get("/blogs/:id", function(req, res){
	var id = req.params.id;
	util.logRequestMessage("/blogs/" + id, "GET");
	Blog.findById(id, function(err, foundBlog){
		if (err){
			console.error(err);
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT
app.get("/blogs/:id/edit", function(req, res){
	var id = req.params.id;
	util.logRequestMessage("/blogs/" + id + "/edit", "GET");
	Blog.findById(id, function(err, foundBlog){
		if (err){
			console.errer(err);
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE
app.put("/blogs/:id", function(req, res){
	var id = req.params.id;
	var blogInfo = req.body.blog;
	// sanitize the input
	req.body.blog.body = req.sanitize(req.body.blog.body);
	util.logRequestMessage("/blogs/" + id + "/edit", "GET");
	Blog.findByIdAndUpdate(id, blogInfo, function(err, updatedBlog){
		if (err){
			console.error(err);
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + id);
		}
	});
});

// DELETE
app.delete("/blogs/:id", function(req, res){
	var id = req.params.id;
	util.logRequestMessage("/blogs/" + id + "/edit", "GET");
	// destroy a blog
	Blog.findByIdAndRemove(id, function(err){
		if (err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
	// redirect
});

// listen to the server
app.listen(8000, function(){
	console.log("Blog app server has been started");
})