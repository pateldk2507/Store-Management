const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
class Employee extends Model {}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hire_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  shift_status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  is_manager: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employees',
});

Employee.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Employee;
