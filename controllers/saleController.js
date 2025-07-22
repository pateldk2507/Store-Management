const Sale = require('../models/Sale');
const Category = require('../models/Category');

exports.createSale = async (req, res) => {
  try {
    const { category_id, location_id, date, amount, notes } = req.body;

    const newSale = await Sale.create({
      user_id: req.user.id,
      category_id,
      location_id,
      date,
      amount,
      notes
    });

    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalesByUser = async (req, res) => {
  try {
    const sales = await Sale.findAll({ where: { user_id: req.user.id } });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoriesForLocation = async (req, res) => {
  try {
    const business_id = req.user.business_id;
    const { location_id } = req.params;

    const categories = await Category.findAll({
      where: { business_id, location_id }
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
