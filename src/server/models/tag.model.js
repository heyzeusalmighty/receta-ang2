var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
    name: String    
});

var Tag = mongoose.model('Tag', tagSchema);

// var testRecipe = new Recipe({ name: "Thomas's Famous Things", description: 'Yes it is', servingSize: '4', ingredients: [], instructions: [], tags: [1, 2, 3]})
// testRecipe.save((err) => {
//     if(err) console.log('errrrr ', err );
// })

module.exports = Tag;

