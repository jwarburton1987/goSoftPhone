'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Phonebooks", [
      { contact_name: "Corey Slade", phone_number: 7605429876, notes: "Address: 555 Main St", userID: 1, createdAt: new Date(), updatedAt: new Date() },
      { contact_name: "John Snow", phone_number: 8146593759, notes: "Address: 555 Main St", userID: 1, createdAt: new Date(), updatedAt: new Date() },
      { contact_name: "Jane Stevens", phone_number: 7144828764, notes: "Address: 555 Main St", userID: 1, createdAt: new Date(), updatedAt: new Date() },
      { contact_name: "George Lucas", phone_number: 7604726276, notes: "Address: 555 Main St", userID: 2, createdAt: new Date(), updatedAt: new Date() },
      { contact_name: "Shane Black", phone_number: 8584367589, notes: "Address: 555 Main St", userID: 2, createdAt: new Date(), updatedAt: new Date() },
      { contact_name: "Jane Stevens", phone_number: 7144828764, notes: "Address: 555 Main St", userID: 2, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Phonebooks", null, {truncate : true});
  }
};
