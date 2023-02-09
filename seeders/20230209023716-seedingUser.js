'use strict';
const fs= require ('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   
   let data = fs.readFileSync('./data/users.json', 'utf-8')
   data = JSON.parse(data)
   data.map(el=>{
      el.createdAt= new Date()
      el.updatedAt= new Date()
      return el
   })
   return queryInterface.bulkInsert('Users', data)
  },

   down (queryInterface, Sequelize) {
 
    return queryInterface.bulkDelete('Users',null,{})
  }
};
