let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: String,
    fav_movies_ids: [String],
    fav_series_ids: [String]
});

// Saves the user's password hashed (plain text password storage is not good)
userSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);