// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// @desc    Register a new user (owner or employee)
// @route   POST /api/v1/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, business_id, temp_password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    let hashedTempPassword = null;
    let isTempPassword = false;

    if (temp_password) {
      const salt = await bcrypt.genSalt(10);
      hashedTempPassword = await bcrypt.hash(temp_password, salt);
      isTempPassword = true;
    }

    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by model hook
      role: role || 'employee',
      business_id: business_id && Number(business_id) > 0 ? business_id : null,
      temp_password: hashedTempPassword,
      is_temp_password: isTempPassword,
      phone,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        business_id: user.business_id,
        temp_password: user.temp_password,
        phone: user.phone,
        is_temp_password: user.is_temp_password,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'No user found' });
    }

    // If first time login, check temp_password
    if (user.is_temp_password) {
      
     
      const isTempMatch = await bcrypt.compare(password, user.temp_password);
     

      if (!isTempMatch) {
        return res.status(401).json({ message: 'Temp password mismatch' });
      }
      // Authenticated with temp password, prompt to create new password
      return res.status(200).json({
        message: 'First time login. Please create a new password.',
        firstTimeLogin: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          business_id: user.business_id,
          temp_password: user.temp_password,
          phone: user.phone,
          is_temp_password: user.is_temp_password,
        },
      });
    }

    // Normal login with permanent password
    if (!(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        business_id: user.business_id,
        temp_password: user.temp_password,
        phone: user.phone,
        is_temp_password: user.is_temp_password,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Change password (e.g. after login with temp password)
// @route   POST /api/v1/auth/change-password
exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword, tempPassword } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // If user is using temp password, verify it
    if (user.is_temp_password) {
      if (!tempPassword) {
        return res.status(400).json({ message: 'Temporary password required' });
      }
      const isMatch = await bcrypt.compare(tempPassword, user.temp_password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Temporary password is incorrect' });
      }
      user.is_temp_password = false;
      user.temp_password = null;
    }

    user.password = newPassword; // Will be hashed by hook
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error while changing password' });
  }
};

// @desc    Get current logged-in user info
// @route   GET /api/v1/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
};
