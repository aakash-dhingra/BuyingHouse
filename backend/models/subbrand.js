'use strict';
const {
  Model
} = require('sequelize');
// backend/models/subbrand.js
module.exports = (sequelize, DataTypes) => {
  const SubBrand = sequelize.define('SubBrand', {
    sub_brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'SubBrands',
    timestamps: false
  });

  SubBrand.associate = function(models) {
    // associations can be defined here
  };

  return SubBrand;
};
