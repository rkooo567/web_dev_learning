var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app")

var catSchema = new mongoose.Schema({
	name: String, 
	age: Number,
	temperament: String 
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the database

/* var george = new Cat({
	name: "Mrs.Norris",
	age: 7,
	temperament: "evil" 
});

george.save(function(err, cat){
	if (err){
		console.error(err);
	} else {
		console.log("We just saved our cat to the DB: ");
		console.log(cat);
	}

});*/

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat){
	if (err){
		console.error(err);
	} else {
		console.log(String(cat) + "is created");
	}
});

// Retrieve all cats from  the DB and console.log each
Cat.find({}, function(err, cats){
	if (err){
		console.log("Oh error!");
		console.error(err);
	} else {
		console.log("All the cat: ");
		console.log(cats);
	}
});