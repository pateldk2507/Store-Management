const express = require('express');
const router = express.Router();
const employeeController = require('../../../controllers/employeeController');
const authMiddleware = require('../../../middlewares/auth');

router.use(authMiddleware);

// Only allow owner
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
