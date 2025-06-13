const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Business extends Model {}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255)
    },
    logo: {
      type: DataTypes.STRING(255)
    },
    brand_color: {
      type: DataTypes.STRING(20)
    }
  },
  {
    sequelize,
    modelName: 'Business',
    tableName: 'businesses',
    timestamps: true,
    underscored: true
  }
);

module.exports = Business;
