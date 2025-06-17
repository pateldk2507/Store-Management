const { Schedule, User } = require('../models');

// @desc    Create a schedule
// @route   POST /api/v1/schedules
// @access  Owner/Manager only
exports.createSchedule = async (req, res) => {
  try {
    const { user_id, location_id, date, start_time, end_time } = req.body;

    const schedule = await Schedule.create({
      user_id,
      location_id,
      date,
      start_time,
      end_time,
    });

    return res.status(201).json(schedule);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get all schedules
// @route   GET /api/v1/schedules
// @access  Authenticated users (employees see their own, owners see all)
exports.getSchedules = async (req, res) => {
  try {
    let schedules;

    

    if (req.user.role === 'employee') {
      schedules = await Schedule.findAll({
        where: { user_id: req.user.id },
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      });
    } else {
      schedules = await Schedule.findAll({
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      });
    }

    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get a schedule by ID
// @route   GET /api/v1/schedules/:id
// @access  Authenticated users
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    if (req.user.role === 'employee' && schedule.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Update a schedule
// @route   PUT /api/v1/schedules/:id
// @access  Owner/Manager only
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    await schedule.update(req.body);

    return res.status(200).json(schedule);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Delete a schedule
// @route   DELETE /api/v1/schedules/:id
// @access  Owner/Manager only
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    await schedule.destroy();

    return res.status(200).json({ message: 'Schedule deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
