const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });

        if (req.user.role !== 'owner') {
        return res.status(403).json({ error: 'Access denied' });
        }

        const { name } = req.body;

        console.log(req.user); // Debugging line
        

        const category = await Category.create({
        name,
        business_id: 9, // ✅ ensure business_id is assigned
        });
    
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { business_id: 9 }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id, business_id: 9 }
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });
    const category = await Category.findOne({
      where: { id: req.params.id, business_id: 9 }
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.update(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });
    const category = await Category.findOne({
      where: { id: req.params.id, business_id: 9 }
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
