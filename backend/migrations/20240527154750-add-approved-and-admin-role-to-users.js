'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Running migration UP...');
    await queryInterface.addColumn('Users', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('vendor', 'buying_house', 'admin'),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    console.log('Running migration DOWN...');
    await queryInterface.removeColumn('Users', 'approved');

    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('vendor', 'buying_house'),
      allowNull: false
    });
  }
};
