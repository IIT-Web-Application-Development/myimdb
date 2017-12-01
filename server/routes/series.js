const express = require('express');
const router = express.Router();
const path = require('path');

// Get the models
const Tv = require('../models/tv');

// ***************** IMPORTANT ********************************
// All endpoints that return JSON should be prefixed with /api/ 
//
// All other endpoints should serve html or pug (templates)
// ************************************************************

// GET JSON /api/series
router.get('/api/series', (req, res) => {
    res.json({ msg: 'series endpoint works' });
});

// GET HTML /series
router.get('/series', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/tvseries.html'));
});


module.exports = router;