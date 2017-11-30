/*
 * Mongoose schema for Movies
 */

let mongoose = require('mongoose');

// define schema for Movie
let Schema = mongoose.Schema;
let MovieSchema = new Schema({
    title:          {type: String, required: true, unique: true},
    description:	String,
    /*
    releaseDate:    Date,
    genre:        	String,
    rating:         Number,
    favorite:       {type: Boolean, default: false},
    actors:      	[String],
    image_url:      String
    */
});

//Export function to create "Movie" model class
module.exports = mongoose.model('Movie', MovieSchema);
