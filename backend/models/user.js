'use strict';
const {
  Model
} = require('sequelize');
// backend/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('vendor', 'buying_house'),
      allowNull: false
  },
  approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
  }
  }, {
    tableName: 'Users',
    timestamps: false
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
