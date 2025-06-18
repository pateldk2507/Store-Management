const ClosingDuty = require('../models/ClosingDuties');


exports.createDuty = async (req, res) => {
  try {
    const duty = await ClosingDuty.create({ ...req.body, business_id: 9 }); // Ensure business_id is set
    res.status(201).json(duty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateDuty = async (req, res) => {
  try {
    const duty = await ClosingDuty.findByPk(req.params.id);
    if (!duty) return res.status(404).json({ message: 'Not found' });

    await duty.update(req.body);
    res.status(200).json(duty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDuty = async (req, res) => {
  try {
    const duty = await ClosingDuty.findByPk(req.params.id);
    if (!duty) return res.status(404).json({ message: 'Not found' });

    await duty.destroy();
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDuties = async (req, res) => {
  try {
    const duties = await ClosingDuty.findAll({ where: { business_id: 9 } }); // Ensure business_id is set
    res.status(200).json(duties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
