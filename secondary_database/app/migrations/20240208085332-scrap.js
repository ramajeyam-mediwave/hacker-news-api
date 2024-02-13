'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('scrap', { 
      id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        unique: true,
      }, 
      title: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      link: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    
    });
     
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('scrap');

  }
};
