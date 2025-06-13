const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

// Add other routes below

module.exports = router;
