// using faker package, create 10 random 'fake' product names and prices.

var faker = require('faker')

for (var i = 0; i < 10; i++){
	var fakeProduct = [faker.commerce.productName(), faker.commerce.price()]
	console.log(i + 1 + ". " + fakeProduct[0] + "'s price is $" + fakeProduct[1])
}