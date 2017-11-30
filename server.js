// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get the models
let Movie = require('./server/models/movie');
let Tv = require('./server/models/tv');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// connect to mongoDB with promise
const db = 'mongodb://localhost/myimdb';
mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true });

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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