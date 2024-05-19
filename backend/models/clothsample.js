'use strict';
const {
  Model
} = require('sequelize');
// backend/models/clothsample.js
module.exports = (sequelize, DataTypes) => {
  const ClothSample = sequelize.define('ClothSample', {
    sample_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sample_reference_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sub_brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    image: {
      type: DataTypes.BLOB
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sample_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'ClothSamples',
    timestamps: false
  });

  ClothSample.associate = function(models) {
    ClothSample.belongsTo(models.Vendor, { foreignKey: 'vendor_id' });
    ClothSample.belongsTo(models.SubBrand, { foreignKey: 'sub_brand_id' });
    ClothSample.hasMany(models.QualityAssurance, { foreignKey: 'sample_id' });
  };

  return ClothSample;
};
