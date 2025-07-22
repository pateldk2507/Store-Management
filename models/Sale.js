const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // ✅ Make sure this points to the actual User model

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  location_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  notes: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'sales',
  timestamps: true,
  underscored: true
});


module.exports = Sale;
