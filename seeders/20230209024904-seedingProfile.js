'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Profiles',[
      {
        name : "John Doe",
        gender: "Male",
        birthDate: "1998-07-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        name : "Jenna Doe",
        gender: "Female",
        birthDate: "1990-07-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      }
     ])
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null, {})
  }
};
