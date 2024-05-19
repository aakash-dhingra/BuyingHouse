'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QualityAssurances', {
      qa_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sample_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ClothSamples',
          key: 'sample_id'
        },
        allowNull: false
      },
      quality_type: {
        type: Sequelize.ENUM('BS', 'SS'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
      },
      rejection_reason: {
        type: Sequelize.TEXT
      },
      checked_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      checked_date: {
        type: Sequelize.DATE
      },
      comments: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('QualityAssurances');
  }
};
