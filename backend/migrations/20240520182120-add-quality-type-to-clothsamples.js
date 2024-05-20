'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ClothSamples', 'quality_type', {
      type: Sequelize.ENUM('BS', 'SS'),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ClothSamples', 'quality_type');
  }
};
