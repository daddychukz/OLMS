
const db = require('../../src/models');

class SeedHelper {
  static init() {
    return db.sequelize.sync({ force: true })
      .then(() => Promise.all([SeedHelper.createAdminTable()]),
        err => console.log(err, 'Error!'),
      );
  }
  static populateAdminTable() {
    const admin =
        {
          id: 1234,
          fullName: 'John Doe',
          email: 'john@gmail.com',
          sex: 'male',
          userName: 'john',
          phoneNumber: 8080000000,
          pasword: 'pass',
          memLevel: 'Gold',
          isAdmin: true
        };
    return db.users.create(admin);
  }
}

module.exports = SeedHelper;
