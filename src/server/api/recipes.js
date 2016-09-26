'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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
    })
})



module.exports = router;





//app.get('/cats', function(req, res) {
//     Cat.find({}, function(err, docs) {
//       if(err) return console.error(err);
//       res.json(docs);
//     });
//   });