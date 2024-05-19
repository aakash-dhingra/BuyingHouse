'use strict';
const {
  Model
} = require('sequelize');
// backend/models/qualityassurance.js
module.exports = (sequelize, DataTypes) => {
  const QualityAssurance = sequelize.define('QualityAssurance', {
    qa_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sample_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quality_type: {
      type: DataTypes.ENUM('BS', 'SS'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    rejection_reason: {
      type: DataTypes.TEXT
    },
    checked_by: {
      type: DataTypes.INTEGER
    },
    checked_date: {
      type: DataTypes.DATE
    },
    comments: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'QualityAssurances',
    timestamps: false
  });

  QualityAssurance.associate = function(models) {
    QualityAssurance.belongsTo(models.ClothSample, { foreignKey: 'sample_id' });
    QualityAssurance.belongsTo(models.User, { foreignKey: 'checked_by' });
    QualityAssurance.hasMany(models.QualityAssuranceDefect, { foreignKey: 'qa_id' });
  };

  return QualityAssurance;
};
