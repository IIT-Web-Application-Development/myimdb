const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Init App
// const app = express();

// Load View Engine
// app.set('views', path.join(__dirname, '../../public/views'));
// app.set('view engine', 'pug');
const app = express();
// Get the models
const Movie = require('../models/movie');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect to mongoDB with promise
const db = 'mongodb://localhost/myimdb';
mongoose.Promise = Promise;
mongoose.connect(db, { useMongoClient: true });

// ***************** IMPORTANT ********************************
// All endpoints that return JSON should be prefixed with /api/ 
//
// All other endpoints should serve html or pug (templates)
// ************************************************************

// GET /api/movies
router.get('/api/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    //console.log('GET /movies - getting all movies');
    Movie.find({}).select('-__v')
        .exec()
        .then((movies) => {
            //console.log(movies);
            res.json(movies);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

// GET /api/movies/:id route with mongoose/promise
router.get('/api/movies/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    //console.log('Get /api/movies/:id - getting one movie');
    Movie.findOne({ _id: req.params.id })
        .exec()
        .then((movies) => {
            //console.log(movies);
            res.json(movies);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

// POST /api/movie route with mongoose/promise
router.post('/api/movie', passport.authenticate('jwt', { session: false }), (req, res) => {
    //console.log('POST /api/movie - Adding one movie');
    var newMovie = new Movie(req.body);
    newMovie.save()
        //.exec()
        .then((movie) => {
            //console.log(movie);
            res.json(movie);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

// DELETE /api/movie/:id route with mongoose/promise
router.delete('/api/movie/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    //console.log('DELETE /api/movie/:id - Attempting to delete one movie');
    Movie.findOneAndRemove({ _id: req.params.id })
        //.exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            //console.log("DELETE /api/movie Sending error");
            res.status(404).send(err);
        });
});

// GET HTML /movies
// router.get('/movies', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/views/movies.html'));
// });

router.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movie.find({}).select('-__v')
        .exec()
        .then((movies) => {
            //console.log(movies);
            res.render('movies', {
                title: 'Movie List:',
                movies: movies
            });
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

// GET HTML /movies
// router.get('/movies', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/views/movies.html'));
// });

router.get('/movie/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movie.findOne({ _id: req.params.id }).select('-__v')
        .exec()
        .then((movies) => {
            //console.log(movies);
            res.render('movie', {
                title: 'Movie Selected:',
                image_url: movies.image_url,
                oneMovie: movies
            });
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.get('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render('addMovie', {
        title: 'Add new Movie'
    });
});

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('POST /add - Adding one movie');
    var newMovie = new Movie(req.body);
    newMovie.save()
        //.exec()
        .then((movie) => {
            //console.log(movie);
            //res.json(movie);
            res.redirect('/movies')
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.get('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movie.findOne({ _id: req.params.id }).select('-__v')
        .exec()
        .then((movies) => {
            //console.log(movies);
            res.render('editMovie', {
                title: 'Edit Movie:',
                editMovie: movies
            });
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});


router.post('/edit/:id', (req, res) => {
    console.log('POST /edit/:id - Adding one edited movie');

    let movie = {};
    movie.title = req.body.title;
    movie.description = req.body.description;
    movie.image_url = req.body.image_url;

    //console.log('Title is: ' + movie.title);
    //console.log('Description is: ' + movie.description);

    let query = { _id: req.params.id };
    //console.log('The query id is: ' + query._id);

    Movie.findByIdAndUpdate(req.params.id, movie)
        .exec()
        .then((movies) => {
            //console.log(movies);
            res.redirect('/movies');
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

module.exports = router;