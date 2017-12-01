const express = require('express');
const router = express.Router();
const User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

/* GET api listing. */
router.get('/', (req, res) => {
    res.json({ result: 'api works' });
});

/**
 * LOGIN
 */
router.post('/authenticate', (req, res) => {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(404).json({ error: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign({ id: user._id, username: user.username }, config.secret, { expiresIn: '10h' });
                    res.json({ token: token });
                } else {
                    res.status(404).json({ error: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

/**
 * SIGNUP
 */
// process the signup form
router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(404).json({ error: 'Username and password required.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.full_name
        });

        // Attempt to save the user
        newUser.save(function(err, user) {
            if (err) {
                return res.status(404).json({ error: 'Username already exists.' });
            }
            res.json({ id: user._id });
        });
    }
});

/**
 * SERIES
 */
// TODO: Series API


/**
 * MOVIES
 */
// TODO Movies API


module.exports = router;