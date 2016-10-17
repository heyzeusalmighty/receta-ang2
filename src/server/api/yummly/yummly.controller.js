'use strict';

var mongoose = require('mongoose');
const chalk = require('chalk');
var config = require('./../../config/config');
var http = require('http');

var db = mongoose.connection;
mongoose.Promise = global.Promise;
var Recipe = require('./../../models/recipe.model.js');

var hostName = "http://api.yummly.com/v1/api/";
var yumEndpoint = "/v1/api/"
var appId = config.yummlyAppId;
var appKey = config.yummlyAppKey;
var authUrl = "?_app_id=" + appId + "&_app_key=" + appKey;
var searchOut = hostName + "recipes" + authUrl + "&maxResult=10&q=";

let dummyResponse = require('./dummyResponse');

exports.nextPage = function(req, res) {

	// doing this right now so I don't hammer the yummly service
	//res.send(dummyResponse);

	// REAL CODE
	var search = req.params.search;
	var page = req.params.page * 10;
	var replaced = search.split(' ').join('+');
	var totes = searchOut + replaced + "&start=" + page;

	var request = http.request(totes, function(response){
		var body = "";
		response.on('data', function(data) {
			body += data;
		});
		response.on('end', function() {
			res.send(JSON.parse(body));
		});
	});

	request.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});

	request.end();
}

exports.show = function(req, res) {

	let search = req.params.recipeId;
	let finalUrl = hostName + "recipe/" + search + authUrl;	
	console.log(chalk.green('pointing to => ', finalUrl));

	let request = http.request(finalUrl, function(response){
		
		let body = "";
		response.on('data', function(data) {
			body += data;
		});
		response.on('end', function() {
			res.send(JSON.parse(body));
		});
	});

	request.on('error', function(e) {
		console.log('Problem with request: ' + e.message);
	});

	request.end();

}

exports.getInstructions = function(req, res) {
	var recipeId = req.params.recipeId;

	console.log('getting instructions', recipeId);
	//var url = req.params.url;
	var recipe = {};

	Recipe.findById(recipeId, function (err, rec) {
		if(err) { return handleError(res, err); }
		if(!rec) { return res.status(404).send('Not Found'); }

		console.log('got the recipe, getting url ', rec.sourceUrl);
		
		request(rec.sourceUrl, function (error, response, body) {
  			if (!error && response.statusCode === 200) {
			    
			    var $ = cheerio.load(body);
			    
				var directions = [];

			    if(rec.sourceUrl.indexOf('marthastewart') > -1) {
			    	console.log('its a marthastewart');

			    	var ins = $('div .col2 p').contents();

			    	var insCounter = 1;
			    	for(var y = 0; y < ins.length; y++) {
			    		
			    		var cleanedIns = ins[y].data.trim();
			    		if(cleanedIns.length > 2 && (cleanedIns.indexOf('delivered to your inbox') === -1) && (cleanedIns.indexOf('Subscribe to Martha Stewart') === -1)) {
							directions.push({id: insCounter, instruction: cleanedIns});
			    			insCounter++;
			    		}			    		
			    	}

			    	Recipe.findOne({ _id: recipeId }, function (err, doc){
						doc.instructions = directions;
						doc.save();	
						return res.status(200).send(directions);

					});

			    }

			    if(rec.sourceUrl.indexOf('myrecipes.com') > -1) {
			    	var instructions = $('div .field-instructions p').contents();
			    	
			    	for(var x = 0; x < instructions.length; x++) {
			    		var cleanedInsts = instructions[x].data.trim();
			    		if(cleanedInsts.length > 2) {
			    			console.log(cleanedInsts)
			    			directions.push({id: x + 1, instruction: cleanedInsts})
			    		}			    		
			    	}

			    	Recipe.findOne({ _id: recipeId }, function (err, doc){
						doc.instructions = directions;
						doc.save();						
						return res.status(200).send(directions);
					});


			    	//field-instructions
			    }

			    



			}
		});
		
		


	});
}










