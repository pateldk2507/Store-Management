const express = require('express');
const router = express.Router();

const apiV1Routes = require('./api/v1');

router.get('/', (req, res) => {
  res.send('<center><h1 style="color:red;">Welcome to Ci/CD Store Management API </h1></center>');
});

router.use('/api/v1', apiV1Routes);

module.exports = router;
