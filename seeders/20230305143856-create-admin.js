'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users",[
      {
        username: "admin",
        fullName: "admin",
        email: "info@admin.com",
        password: "$2a$10$UqK6231inOXbfETK4HtU4eNAvfXIg46H2IVD.K6q3W3JFNRaxZi9S"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
