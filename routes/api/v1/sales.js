const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/saleController');
const authenticate = require('../../../middlewares/auth');

router.use(authenticate);

router.post('/', controller.createSale); // employee only
router.get('/', controller.getSalesByUser); // employee view their own
router.get('/categories/:location_id', controller.getCategoriesForLocation);

module.exports = router;
