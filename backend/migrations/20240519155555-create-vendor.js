'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vendors', {
      vendor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_info: {
        type: Sequelize.TEXT
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vendors');
  }
};
