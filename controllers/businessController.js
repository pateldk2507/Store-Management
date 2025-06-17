const Business = require('../models/Business');

const Location = require('../models/Location');

exports.createBusiness = async (req, res) => {
  try {
    const { name, address, logo, brand_color } = req.body;
    const owner_id = req.user.id;
    console.log(req.body);
    console.log(`Creating business for owner_id: ${owner_id}`);
    
    
    const business = await Business.create({ name, address, logo, brand_color, owner_id });

    await Location.create({
      business_id: business.id,
      name : name + ' Main Location',
      address: address || null,
    });

    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create business', error: err.message });
  }
};

exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll({ where: { owner_id: req.user.id } });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching businesses' });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching business' });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const { name, address, logo, brand_color } = req.body;
    const business = await Business.findOne({ where: { id: req.params.id, owner_id: req.user.id } });

    if (!business) return res.status(404).json({ message: 'Business not found' });

    await business.update({ name, address, logo, brand_color });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update business' });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({ where: { id: req.params.id, owner_id: req.user.id } });

    if (!business) return res.status(404).json({ message: 'Business not found' });

    await business.destroy();
    res.json({ message: 'Business deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete business' });
  }
};
