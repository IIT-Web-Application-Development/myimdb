var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file

var getStrategy = function(passport) {
    var opts = {};
    var cookieExtractor = function(req) {
        var token = null;
        if (req && req.cookies) {
            token = req.cookies['JWT'];
        }
        return token;
    };
    opts.jwtFromRequest = cookieExtractor; //ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    return new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id, function(err, user) {
            if (err) {
                console.error(err);
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
};

module.exports = getStrategy;