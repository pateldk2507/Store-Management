const express = require('express');
const router = express.Router();
const businessController = require('../../../controllers/api/v1/businessController');
const authMiddleware = require('../../../middlewares/auth');

router.use(authMiddleware); // Protect all routes below

router.post('/', businessController.createBusiness);
router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;
