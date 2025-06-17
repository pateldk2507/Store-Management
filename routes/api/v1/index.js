const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
// Add other routes below
router.use('/auth', authRoutes);
router.use('/businesses', require('./business'));
router.use('/employees', require('./employees'));
router.use('/schedules', require('./schedule'));

module.exports = router;
