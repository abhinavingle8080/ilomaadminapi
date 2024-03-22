'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
    {
      name: "iloma admin",
      email: "superadmin@ilomaadmin.com",
      password: "$2b$10$rhjZ53vNB0e8WvOLDutHXeu.sT7YHSaQOdqpbpxzGuAnYnZthrBbS",
      created_at: new Date(),
      updated_at: new Date()
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all rows from the 'Users' table
    await queryInterface.bulkDelete('users', null, {});
  },
};