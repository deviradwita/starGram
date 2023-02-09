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
   return queryInterface.bulkInsert('Users',[
    {
      userName : "bahemon27",
      email : "momon@mail.com",
      password : "12345",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName : "choco123",
      email : "chocolate@gmail.com",
      password : "qwerty12",
      role: "User",
      createdAt: new Date(),
      updatedAt: new Date() 
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
    return queryInterface.bulkDelete('Users',null,{})
  }
};
