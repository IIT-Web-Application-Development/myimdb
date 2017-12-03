const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Init App
// const app = express();

// Load View Engine
// app.set('views', path.join(__dirname, '../../public/views'));
// app.set('view engine', 'pug');

// Get the models
const Movie = require('../models/movie');

// connect to mongoDB with promise
const db = 'mongodb://localhost/myimdb';
mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true });

// ***************** IMPORTANT ********************************
// All endpoints that return JSON should be prefixed with /api/ 
//
// All other endpoints should serve html or pug (templates)
// ************************************************************

// GET /api/movies
router.get('/api/movies', (req, res) => {
    console.log('GET /movies - getting all movies');
    Movie.find({}).select('-__v')
        .exec()
        .then((movies) => {
            console.log(movies);
            res.json(movies);
        })
        .catch((err) => {
            res.status(404).res.send(err);
        });
});

// GET /api/movies/:id route with mongoose/promise
router.get('/api/movies/:id', (req, res) => {
    console.log('Get /api/movies/:id - getting one movie');
    Movie.findOne({_id: req.params.id})
        .exec()
         .then((movies) => {
            console.log(movies);
            res.json(movies);
        })
        .catch((err) => {
            res.status(404).res.send(err);
        });
});

 // POST /api/movie route with mongoose/promise
router.post('/api/movie', (req, res) => {
    console.log('POST /api/movie - Adding one movie');
    var newMovie = new Movie(req.body);
    newMovie.save()
        //.exec()
        .then((movie) => {
            console.log(movie);
            res.json(movie);
        })
        .catch((err) => {
            res.status(404).res.send(err);
        });
});
  
  // DELETE /api/movie/:id route with mongoose/promise
router.delete('/api/movie/:id', (req, res) => {
    console.log('DELETE /api/movie/:id - Attempting to delete one movie');
    Movie.findOneAndRemove({_id: req.params.id})
        //.exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            console.log("DELETE /api/movie Sending error");
            res.sendStatus(404).res.send(err);
        });
}); 

// GET HTML /movies
// router.get('/movies', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/views/movies.html'));
// });

router.get('/movies', (req, res) => {
    Movie.find({}).select('-__v')
    .exec()
    .then((movies) => {
        console.log(movies);
        res.render('movies', {
            title: 'Movie List:',
            movies: movies
        });
    })
    .catch((err) => {
        res.status(404).res.send(err);
    });
});

// GET HTML /movies
// router.get('/movies', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/views/movies.html'));
// });

router.get('/movie/:id', (req, res) => {
    Movie.findOne({_id: req.params.id}).select('-__v')
    .exec()
    .then((movies) => {
        console.log(movies);
        res.render('movie', {
            title: 'Movie Selected:',
            image_url: movies.image_url,
            oneMovie: movies
        });
    })
    .catch((err) => {
        res.status(404).res.send(err);
    });
});

router.get('/add', (req, res) => {
    res.render('addMovie');
});

router.post('/add', (req, res) => {
    console.log('POST /add - Adding one movie');
    var newMovie = new Movie(req.body);
    newMovie.save()
        //.exec()
        .then((movie) => {
            console.log(movie);
            //res.json(movie);
            res.redirect('/movies')
        })
        .catch((err) => {
            res.status(404).res.send(err);
        });
});

module.exports = router;