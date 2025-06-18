// controllers/closingDutySubmissionController.js
const ClosingDutySubmission = require('../models/ClosingDutySubmission');


exports.createSubmission = async (req, res) => {
  try {
    const { location_id, date, completed_duties, signature } = req.body;
    const submission = await ClosingDutySubmission.create({
      user_id: req.user.id,
      location_id,
      date,
      completed_duties,
      signature
    });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await ClosingDutySubmission.findAll();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await ClosingDutySubmission.findAll({
      where: { user_id: req.user.id }
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
