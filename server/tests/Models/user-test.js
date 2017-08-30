// /**
//  * API Endpoint Tests
//  */

const app = require('../../src/app');
const models = require('../../src/models/');
const expect = require('chai').expect;
const fakeData = require('../helpers/fakeData');

let newUser;

describe('Online Library Management System', () => {
  models
    .user
    .destroy({
      cascade: true,
      truncate: true
    });

  it('creates a new user', (done) => {
    models.user.create(fakeData.userOne)
      .then((user) => {
        newUser = user;
        expect(newUser.email).equal(fakeData.userOne.email);
        expect(newUser.userName).equal(fakeData.userOne.userName);
        expect(newUser.sex).equal(fakeData.userOne.sex);
        done();
      });
  });

  it('ensures password is hashed', () => {
    expect(newUser.password)
      .to
      .not
      .equal(fakeData.userOne.password);
  });
});

describe('Unique Email and Username', () => {
  it('check to ensure that only users with unique email are stored in db', (done) => {
    models.user
      .create(fakeData.userOne)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeUniqueConstraintError');
        expect(error.errors[0].message).to.equal('email must be unique');
        done();
      });
  });

  it('check to ensure that only users with unique username are stored in db', (done) => {
    fakeData.userOne.email = 'unique@yahoo.com';
    models.user
      .create(fakeData.userOne)
      .catch((err) => {
        expect(err.name).to.equal('SequelizeUniqueConstraintError');
        expect(err.errors[0].message).to.equal('userName must be unique');
        done();
      });
  });
});
