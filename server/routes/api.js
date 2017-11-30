const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({ result: 'api works' });
});

/**
 * LOGIN
 */
router.post('/authenticate', (req, res) => {
  let user = req.body;

  if (user.username !== 'test') {
    return res.status(404).json({ error: 'Invalid credentials' });
  }

  res.json({ token: 'yourkey' });
});

/**
 * SIGNUP
 */
// TODO SIGNUP API


/**
 * SERIES
 */
// TODO: Series API


/**
 * MOVIES
 */
// TODO Movies API


module.exports = router;