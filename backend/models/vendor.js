'use strict';
const {
  Model
} = require('sequelize');
// backend/models/vendor.js
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    vendor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_info: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'Vendors',
    timestamps: false
  });

  Vendor.associate = function(models) {
    // associations can be defined here
  };

  return Vendor;
};
