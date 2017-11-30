/*
 * Mongoose schema for Movie
 */

let mongoose = require('mongoose');

// define schema for Tv
let Schema = mongoose.Schema;
let TvSchema = new Schema({
    title:          {type: String, required: true, unique: true},
	description:	String,
    season:       	Number,
    episode:      	Number,
    releaseDate:    Date,
    genre:        	String,
    rating:         Number,
    favorite:       {type: Boolean, default: false},
    actors:         [String],
    image_url:      String
});

//Export function to create "Movie" model class
module.exports = mongoose.model('Tv', TvSchema);