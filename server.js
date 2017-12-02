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
mongoose.Promise = global.Promise;

// Initialize Express App
const app = express();

// Get our API routes
const usersApi = require('./server/routes/users');
const moviesApi = require('./server/routes/movies');
const seriesApi = require('./server/routes/series');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure Passport
passport.use(require('./server/config/passport')(passport));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Load View Engine
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'pug');

// Set our routes
app.use('/', moviesApi);
app.use('/', seriesApi);

// Set our user api routes
app.use('/api', usersApi);

// To all other routes let angular work
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