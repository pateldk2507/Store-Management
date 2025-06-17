const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User');
const Employee = require('./Employee');
const Business = require('./Business');
const Schedule = require('./Schedule');
const Location = require('./Location');



// Define associations
User.hasMany(Schedule, { foreignKey: 'user_id' });
Schedule.belongsTo(User, { foreignKey: 'user_id' });

Business.hasMany(Location, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Location.belongsTo(Business, { foreignKey: 'business_id' });


const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  User,
  Employee,
  Business,
  Schedule, 
  Location,
  syncDB,
  sequelize
};
