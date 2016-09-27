

'use strict';

//import path from 'path';


module.exports = function(app) {
    
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    
    app.use('/api/recipes', require('./recipes'));


    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname,'/../../dist/index.html'));
    });

    app.listen(app.get('port'), function() {
        console.log('Angular 2 Full Stack listening on port '+app.get('port'));
    });
}


















// export default function(app) {
    
//     app.use('/api/recipes', require('./recipes'));

//     // all other routes are handled by Angular
//     app.get('/*', function(req, res) {
//         res.sendFile(path.join(__dirname,'/../../dist/index.html'));
//     });

//     app.listen(app.get('port'), function() {
//         console.log('Angular 2 Full Stack listening on port '+app.get('port'));
//     });
    
// }



// // Models
// var Cat = require('./models/cat.model.js');

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to MongoDB');

//   // APIs
//   // select all
//   app.get('/cats', function(req, res) {
//     Cat.find({}, function(err, docs) {
//       if(err) return console.error(err);
//       res.json(docs);
//     });
//   });

//   // count all
//   app.get('/cats/count', function(req, res) {
//     Cat.count(function(err, count) {
//       if(err) return console.error(err);
//       res.json(count);
//     });
//   });

//   // create
//   app.post('/cat', function(req, res) {
//     var obj = new Cat(req.body);
//     obj.save(function(err, obj) {
//       if(err) return console.error(err);
//       res.status(200).json(obj);
//     });
//   });

//   // find by id
//   app.get('/cat/:id', function(req, res) {
//     Cat.findOne({_id: req.params.id}, function(err, obj) {
//       if(err) return console.error(err);
//       res.json(obj);
//     })
//   });

//   // update by id
//   app.put('/cat/:id', function(req, res) {
//     Cat.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
//       if(err) return console.error(err);
//       res.sendStatus(200);
//     })
//   });

//   // delete by id
//   app.delete('/cat/:id', function(req, res) {
//     Cat.findOneAndRemove({_id: req.params.id}, function(err) {
//       if(err) return console.error(err);
//       res.sendStatus(200);
//     });
//   });


  
// });