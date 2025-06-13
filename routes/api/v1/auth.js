const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/api/v1/authController');
const authMiddleware = require('../../../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', authMiddleware, authController.changePassword);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
