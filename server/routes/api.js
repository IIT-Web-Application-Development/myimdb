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
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign({
                        user: user,
                        id: user._id
                    }, "asasasasasas", { expiresIn: '10h' });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.json({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

router.get('/foo', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
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