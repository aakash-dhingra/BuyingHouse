'use strict';
const {
  Model
} = require('sequelize');
// backend/models/defect.js
module.exports = (sequelize, DataTypes) => {
  const Defect = sequelize.define('Defect', {
    defect_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Defects',
    timestamps: false
  });

  Defect.associate = function(models) {
    Defect.hasMany(models.QualityAssuranceDefect, { foreignKey: 'defect_id' });
  };

  return Defect;
};
