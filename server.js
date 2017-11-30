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
const User = require('./server/models/user');

// Bring in defined Passport Strategy

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
app.use(passport.initialize());
require('./server/config/passport')(passport);


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * SIGNUP
 */
// process the signup form
app.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, message: 'Please enter username and password.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({ success: false, message: 'That username address already exists.' });
            }
            res.json({ success: true, message: 'Successfully created new user.' });
        });
    }
});

// Set our api routes
app.use('/api', api);

// Catch static files
app.get('/series', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/tvseries.html'));
});

// Catch static
app.get('/movies', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/movies.html'));
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