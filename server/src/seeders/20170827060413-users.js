const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      fullName: process.env.adminFullName,
      email: process.env.adminEmail,
      sex: process.env.adminSex,
      userName: process.env.adminUserName,
      phoneNumber: process.env.adminPhoneNumber,
      password: bcrypt.hashSync(process.env.adminPassword, bcrypt.genSaltSync(8)),
      memLevel: process.env.adminMemLevel,
      isAdmin: process.env.adminIsAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullName: process.env.userFullName,
      email: process.env.userEmail,
      sex: process.env.userSex,
      userName: process.env.userUserName,
      phoneNumber: process.env.userPhoneNumber,
      password: bcrypt.hashSync(process.env.userPassword, bcrypt.genSaltSync(8)),
      memLevel: process.env.userMemLevel,
      isAdmin: process.env.userIsAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
  },

  down(queryInterface, Sequelize) {
    return queryInterface
      .bulkDelete('users');
  }
};
