const express = require('express');
const router = express.Router();
const scheduleController = require('../../../controllers/scheduleController');
const authenticate = require('../../../middlewares/auth');
const authorize = require('../../../middlewares/authorize');

// Only owner and manager can CRUD
router.post('/', authenticate, authorize(['owner', 'manager']), scheduleController.createSchedule);
router.put('/:id', authenticate, authorize(['owner', 'manager']), scheduleController.updateSchedule);
router.delete('/:id', authenticate, authorize(['owner', 'manager']), scheduleController.deleteSchedule);

// All users including employees can view
router.get('/', authenticate, scheduleController.getSchedules);
router.get('/:id', authenticate, scheduleController.getScheduleById);


module.exports = router;
