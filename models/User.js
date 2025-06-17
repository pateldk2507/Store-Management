// models/user.js
const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

class User extends Model {
  // Method to compare password
  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]+$/i, // Only numbers
      },
    },
    role: {
      type: DataTypes.ENUM('owner', 'employee'),
      defaultValue: 'employee',
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temp_password : {
      type: DataTypes.STRING,
      allowNull: true,
     
      
    },
    is_temp_password: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      set(is_temp_password) {
        // If is_temp_password is provided, set it as a boolean
        this.setDataValue('is_temp_password', is_temp_password ? true : false);
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);



module.exports = User;
