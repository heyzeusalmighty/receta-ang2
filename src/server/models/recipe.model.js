var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    recipeName: String,
    description: String,
    servingSize: String,
    imageUrl: String,
    source: String,
    sourceUrl: String,
    yummlyId: String,
    ingredients: [{
        title : String,
        ingredients: [String]
    }],
    instructions: [{
        id: Number,
        instruction: String
    }],
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