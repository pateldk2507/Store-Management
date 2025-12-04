const express = require('express');
const router = express.Router();

const apiV1Routes = require('./api/v1');

router.get('/', (req, res) => {
  res.send('Welcome to Automation world');
});

router.use('/api/v1', apiV1Routes);

module.exports = router;
