'use strict';
const fs= require ('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
 
    let data = fs.readFileSync('./data/tags.json', 'utf-8')
    data = JSON.parse(data)
    data.map(el=>{
       el.createdAt= new Date()
       el.updatedAt= new Date()
       return el
    })
    return queryInterface.bulkInsert('Tags', data)
  },

   down (queryInterface, Sequelize) {
  
    return queryInterface.bulkDelete('Tags', null, {})
  }
};
