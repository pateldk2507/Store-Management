const { DataTypes , Model } = require('sequelize');
const sequelize = require('../config/database'); // your sequelize instance
const User = require('./User'); // make sure this path is correct

class Schedule extends Model {}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedules',
    underscored: true,
  }
);

// ✅ Define relationship after model definition
Schedule.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Schedule, { foreignKey: 'user_id', as: 'schedules' });

module.exports = Schedule;
