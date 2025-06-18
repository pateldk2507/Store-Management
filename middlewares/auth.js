const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // Attach user including business_id
    req.user = {
      id: user.id,
      role: user.role,
      business_id: user.business_id
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
