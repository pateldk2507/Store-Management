const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Business = require('./Business');

class Location extends Model {}

Location.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: DataTypes.STRING,
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Location',
  tableName: 'locations',
  timestamps: false
});

Location.belongsTo(Business, { foreignKey: 'business_id' });
Business.hasMany(Location, { foreignKey: 'business_id' });

module.exports = Location;
