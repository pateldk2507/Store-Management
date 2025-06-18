const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/closingDutyController');
const employeeController = require('../../../controllers/closingDutySubmissionController')
const authenticate = require('../../../middlewares/auth');
const authorize = require('../../../middlewares/authorize');

router.use(authenticate);

router.post('/', authorize(['owner']), controller.createDuty);
router.put('/:id', authorize(['owner']), controller.updateDuty);
router.delete('/:id', authorize(['owner']), controller.deleteDuty);
router.get('/', authorize(['owner']), controller.getAllDuties);

router.post('/submit', authorize(['employee', 'owner']), employeeController.createSubmission);

// Owner or manager can view all
router.get('/submission', authorize(['owner', 'manager']), employeeController.getAllSubmissions);

// Employee can view their own
router.get('/my', authorize(['employee']), employeeController.getUserSubmissions);

module.exports = router;
