const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User');
const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  User,
  syncDB,
  sequelize
};
