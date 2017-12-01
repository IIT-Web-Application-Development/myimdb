// Global Requirements
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Local Requirements
const User = require('../models/user');
const config = require('../config/database');

/* GET api listing. */
router.get('/', (req, res) => {
    res.json({ result: 'api works' });
});

/**
 * LOGIN
 */
router.post('/authenticate', (req, res) => {
    // Find user
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        // Validate User exists
        if (!user) {
            console.error('Authentication failed. User not found.');
            res.status(404).json({ error: 'Authentication failed. User not found.' });
            return;
        }
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
                // Sign JWT
                var token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    full_name: user.full_name
                }, config.secret, { expiresIn: '10h' });

                res.json({ token: token });

            } else {
                console.error('Authentication failed. Passwords did not match.');
                res.status(404).json({ error: 'Authentication failed. Passwords did not match.' });
            }
        });

    });
});

/**
 * SIGNUP
 */
// process the signup form
router.post('/register', function(req, res) {

    // Validate required fields
    if (!req.body.username || !req.body.password) {
        console.error('Username and password required.');
        res.status(404).json({ error: 'Username and password required.' });
        return;
    }
    if (!req.body.full_name) {
        console.error('Full name required.');
        res.status(404).json({ error: 'Full name required.' });
        return;
    }

    // Create User
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        full_name: req.body.full_name
    });

    // Attempt to save the user
    newUser.save(function(err, user) {
        if (err) {
            console.error('Username already exists.');
            return res.status(404).json({ error: 'Username already exists.' });
        }
        res.json({ id: user._id });
    });

});

/**
 * USER API
 */
router.get('/user', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(req.user);
    res.json({ id: req.user.id, username: req.user.username, full_name: req.user.full_name });
});


module.exports = router;