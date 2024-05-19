'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClothSamples', {
      sample_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sample_reference_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vendors',
          key: 'vendor_id'
        },
        allowNull: false
      },
      sub_brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubBrands',
          key: 'sub_brand_id'
        },
        allowNull: false
      },
      upload_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      image: {
        type: Sequelize.BLOB
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
      },
      style: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sample_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      season: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('ClothSamples');
  }
};
