'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QualityAssuranceDefects', {
      qa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QualityAssurances',
          key: 'qa_id'
        },
        allowNull: false
      },
      defect_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Defects',
          key: 'defect_id'
        },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QualityAssuranceDefects');
  }
};
