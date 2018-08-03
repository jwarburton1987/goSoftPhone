'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert("Users", [
      { email: "corey.slade@coreyslade.com", password: "Password", createdAt: new Date(), updatedAt: new Date() },
      { email: "test@gmail.com", password: "Password1", createdAt: new Date(), updatedAt: new Date() },
      { email: "softphone@yahoo.com", password: "Password2", createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {truncate : true});
  }
};
