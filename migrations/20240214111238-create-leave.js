'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
        allowNull:false
      },
      day: {
        type: Sequelize.STRING,
        allowNull:false
      },
      duration: {
        type: Sequelize.STRING,
        allowNull:false
      },
      reason: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status:{
        type:Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull:true
       },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaves');
  }
};