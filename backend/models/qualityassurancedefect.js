'use strict';
const {
  Model
} = require('sequelize');
// backend/models/qualityassurancedefect.js
module.exports = (sequelize, DataTypes) => {
  const QualityAssuranceDefect = sequelize.define('QualityAssuranceDefect', {
    qa_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defect_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'QualityAssuranceDefects',
    timestamps: false
  });

  QualityAssuranceDefect.associate = function(models) {
    QualityAssuranceDefect.belongsTo(models.QualityAssurance, { foreignKey: 'qa_id' });
    QualityAssuranceDefect.belongsTo(models.Defect, { foreignKey: 'defect_id' });
  };

  return QualityAssuranceDefect;
};
