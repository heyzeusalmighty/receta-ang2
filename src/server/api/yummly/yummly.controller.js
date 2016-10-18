'use strict';

var mongoose = require('mongoose');
const chalk = require('chalk');
var config = require('./../../config/config');
var http = require('http');
let request = require('request');
let cheerio = require('cheerio');

var db = mongoose.connection;
mongoose.Promise = global.Promise;
var Recipe = require('./../../models/recipe.model.js');

var hostName = "http://api.yummly.com/v1/api/";
var yumEndpoint = "/v1/api/"
var appId = config.yummlyAppId;
var appKey = config.yummlyAppKey;
var resultsBack = 20;
var authUrl = "?_app_id=" + appId + "&_app_key=" + appKey;
var searchOut = hostName + "recipes" + authUrl + "&maxResult=" + resultsBack + "&q=";

let dummyResponse = require('./dummyResponse');

exports.nextPage = function(req, res) {

	// doing this right now so I don't hammer the yummly service
	//res.send(dummyResponse);
	
	var search = req.params.search;
	var page = req.params.page * resultsBack;
	var replaced = search.split(' ').join('+');
	var totes = searchOut + replaced + "&start=" + page;

	let requestOptions = {
		'url' : totes
	};
	if(config.usingProxy) {
		requestOptions.proxy = config.proxyAddress;
	}

	console.log(chalk.blue('you are searching for => '), chalk.green(search));

	request(requestOptions, (error, response, body) => {
		if(error) {
			console.log(chalk.red('Problem with request: ', error.message));
			res.send('ERROR : ', error.message);
		}
		if(!error && response.statusCode == 200) {
			res.send(JSON.parse(body));
		}
	});
}

exports.show = function(req, res) {

	let search = req.params.recipeId;
	let finalUrl = hostName + "recipe/" + search + authUrl;	
	console.log(chalk.green('pointing to => ', finalUrl));

	let requestOptions = {
		'url' : finalUrl
	};
	if(config.usingProxy) {
		requestOptions.proxy = config.proxyAddress;
	}

	request(requestOptions, (error, response, body) => {
		if(error) {
			console.log(chalk.red('Problem with request: ', error.message))
			res.send('ERROR : ', error.message);
		}

		if(!error && response.statusCode == 200) {
			res.send(JSON.parse(body));
		}
	});
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

		this.scrapeByUrl(rec.sourceUrl, (directions) => {
			Recipe.findOne({ _id: recipeId }, function (err, doc){
				doc.instructions = directions;
				doc.save();	
				return res.status(200).send(directions);
			});
		});
		
	});
}

exports.scrapeByUrl = function(url, cb) {

	let requestOptions = {
		'url' : url
	};
	if(config.usingProxy) {
		requestOptions.proxy = config.proxyAddress;
	}

	request(requestOptions, function (error, response, body) {
		if(error) {
			console.log(chalk.red('error => ', error.message));
		}
		if (!error && response.statusCode === 200) {
			
			var $ = cheerio.load(body);
			
			var directions = [];

			if(url.indexOf('marthastewart') > -1) {
				console.log(chalk.red('its a marthastewart'));

				var ins = $('div .col2 p').contents();

				var insCounter = 1;
				for(var y = 0; y < ins.length; y++) {					
					var cleanedIns = ins[y].data.trim();
					if(cleanedIns.length > 2 
						&& (cleanedIns.indexOf('delivered to your inbox') === -1) 
						&& (cleanedIns.indexOf('Subscribe to Martha Stewart') === -1)
						&& (cleanedIns !== 'Gallery')
						&& (cleanedIns !== 'Aggregate')
						) {
						directions.push({id: insCounter, instruction: cleanedIns});
						insCounter++;
					}			    		
				}			
				//cb(directions);

			}

			if(url.indexOf('myrecipes.com') > -1) {
				var instructions = $('div .field-instructions p').contents();
				
				for(var x = 0; x < instructions.length; x++) {
					var cleanedInsts = instructions[x].data.trim();
					if(cleanedInsts.length > 2) {						
						directions.push({id: x + 1, instruction: cleanedInsts})
					}			    		
				}
			}

			directions.forEach((dir) => {
				console.log(chalk.blue(dir.id), chalk.green(dir.instruction))
			});
			cb(directions);



		}
	});
		
		


}










