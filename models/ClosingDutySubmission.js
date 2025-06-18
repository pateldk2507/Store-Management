const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');


const ClosingDutySubmission = sequelize.define('ClosingDutySubmission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  location_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  completed_duties: { type: DataTypes.INTEGER, allowNull: false },
  signature: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'closing_submissions',
  timestamps: true,
  underscored: true,
});

ClosingDutySubmission.belongsTo(User, { foreignKey: 'user_id', as: 'user' });


module.exports = ClosingDutySubmission;
