const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClosingDuty = sequelize.define('ClosingDuty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  duty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'closing_duties',
  timestamps: false
});

module.exports = ClosingDuty;
