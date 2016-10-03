var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    servingSize: String,
    ingredients: [{type: String}],
    instructions: [{type: String}],
    tags: [{type: String}]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

// var testRecipe = new Recipe({ name: "Thomas's Famous Things", description: 'Yes it is', servingSize: '4', ingredients: [], instructions: [], tags: [1, 2, 3]})
// testRecipe.save((err) => {
//     if(err) console.log('errrrr ', err );
// })

module.exports = Recipe;





    // id: number;
    // name: string;
    // description: string;
    // servingSize: string;
    // ingredients: string[];
    // instructions: string[];
    // tags: number[];