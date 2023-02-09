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
    return queryInterface.bulkInsert('Tags',[
      {
        UserId: 1,
        title : "Main Music Di rumah",
        content: "belajar main music via youtube, like ya!",
        imgUrl: "https://tinyurl.com/2ts62cc9",
        createdAt: new Date(),
        updatedAt: new Date(),
        TagId : 1
      },
      {
        UserId: 2,
        title : "belajar masak di kelas masak",
        content: "mencoba hal baru di tahun baru",
        imgUrl: "https://tinyurl.com/2ts62cc9",
        createdAt: new Date(),
        updatedAt: new Date(),
        TagId : 2
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
    return queryInterface.bulkDelete('Tags', null, {})
  }
};
