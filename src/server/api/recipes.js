'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const chalk = require('chalk');

var db = mongoose.connection;
mongoose.Promise = global.Promise;

var Recipe = require('../models/recipe.model.js');

router.get('/', (req, res) => {
    Recipe.find({}, (err, docs) => {
        if (err) return console.error(err);
        res.json(docs);
    })
})

router.get('/:id', (req, res) => {
    let recipeId = req.params.id;
    Recipe.findById(recipeId, (err, recipe) => {
        if (err) return console.error(err);
        res.json(recipe);
    });
});

router.post('/', (req, res) => {
    
    console.log(chalk.blue('myBodyIsReady  :: ') + chalk.green(req.body));

    let query = { '_id': req.body._id };
    console.log(chalk.blue("id before => ") + chalk.green(query._id));

    if(!query._id) {
        query._id = new mongoose.mongo.ObjectId();
    }

    console.log(chalk.blue("id after => ") + chalk.green(query._id));

    Recipe.findOneAndUpdate(query, req.body, {upsert: true, 'new': true}, (err, doc) => {
        if (err) return console.error(err);
        console.log(chalk.blue('new/updated doc => '), chalk.green(doc));
        res.send(doc);
    })    
});

router.delete('/:id', (req, res) => {
    let recipeId = req.params.id;
    let query = { '_id' : req.params.id };
    Recipe.remove(query, (err) => {
        if (err) return console.log(err);
        res.send(recipeId)
    })

})



module.exports = router;





//app.get('/cats', function(req, res) {
//     Cat.find({}, function(err, docs) {
//       if(err) return console.error(err);
//       res.json(docs);
//     });
//   });