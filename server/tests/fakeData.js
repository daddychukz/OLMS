
const faker = require('Faker');

module.exports = {

  adminUser: {
    fullName: 'Administrator',
    email: 'admin@yahoo.com',
    sex: 'male',
    userName: 'admin',
    phoneNumber: 08081234556,
    password: 'admin',
    memLevel: 'Gold',
    isAdmin: true
  },

  userOne: {
    fullName: faker.Name.findName(),
    email: 'user@yahoo.com',
    sex: 'male',
    userName: 'user',
    phoneNumber: 08033221144,
    password: 'user',
    memLevel: 'Silver',
    isAdmin: false
  },
};
