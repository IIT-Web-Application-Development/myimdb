const express = require('express');
const router = express.Router();
const path = require('path');

// Get the models
const Movie = require('../models/movie');

// ***************** IMPORTANT ********************************
// All endpoints that return JSON should be prefixed with /api/ 
//
// All other endpoints should serve html or pug (templates)
// ************************************************************

// GET /api/movies
router.get('/api/movies', (req, res) => {
    console.log('getting all movies');
    Movie.find({})
        .exec()
        .then((movies) => {
            console.log(movies);
            res.json(movies);
        })
        .catch((err) => {
            res.send(err);
        });
});


// GET HTML /movies
router.get('/movies', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/movies.html'));
});


module.exports = router;