'use strict';

var express = require('express');
var controller = require('./recipe.controller');

var router = express.Router();

//router.get('/:search', controller.index);
router.get('/', controller.getAllRecipes);
router.get('/:id', controller.getSingleRecipe);
router.post('/', controller.saveRecipe);
router.delete('./:id', controller.deleteRecipe);


module.exports = router;