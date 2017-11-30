// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./server/config/database.js');
var mongoose = require('mongoose');
var passport = require('passport');

// Get the models
const User = require('./server/models/user');
const Movie = require('./server/models/movie');
const Tv = require('./server/models/tv');

// MongoDB
var connection = mongoose.connect(configDB.url, {
    useMongoClient: true
});
mongoose.Promise = require('bluebird');

// Initialize Express App
const app = express();

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// required for passport
//app.use(passport.initialize());
/*
var getStrategy = require('./server/config/passport');
var strategy = getStrategy(passport);
passport.use(strategy);
app.use(passport.initialize());*/

passport.use(require('./server/config/passport')(passport));

//app.use(passport.initialize());

app.get('/heyho', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user.id + ' and username: ' + req.user.username);
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch static files
app.get('/series', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/tvseries.html'));
});

// Catch static
// app.get('/movies', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/views/movies.html'));
// });

// GET /movies route with promise
app.get('/movies', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/movies.html'));
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


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));