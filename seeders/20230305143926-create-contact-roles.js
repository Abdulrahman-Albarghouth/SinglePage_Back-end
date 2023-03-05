'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ContactRoles",[
      {
        type: "Facebook"
      },
      {
        type: "Instagram"
      },
      {
        type: "Github"
      },
      {
        type: "Whatsapp"
      },
      {
        type: "Website"
      },
      {
        type: "Email"
      },
      {
        type: "Phone"
      },
      {
        type: "Twitter"
      },
      {
        type: "Linkedin"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ContactRoles', null, {});
  }
};
