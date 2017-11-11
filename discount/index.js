#!/usr/bin/env node
var program = require('commander');
var shortid = require('shortid');
var request = require('request');

function CreateDiscount(){
    var discount = {
        name: '20% OFF',
        trigger: 'Code',
        type: 'Rate',
        rate: 20,
        maxNumberOfUsages: 1,
        code: shortid.generate()
    }

    request({
        url: "http://app.snipcart.com/api/discounts",
        auth: {
            'user': 'YOUR_API_KEY'
        },
        method: "POST",
        json: true,
        body: discount
    }, function (error, response, body){
        console.log(body.code);
    });
}

program
    .arguments('<number>')
    .action(function(number) {
        for(var i = parseFloat(number); i > 0; i--){
            CreateDiscount();
        }
    })
    .parse(process.argv);