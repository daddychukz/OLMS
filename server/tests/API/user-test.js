// /**
//  * API Endpoint Tests
//  */
import request from 'supertest';
import chai from 'chai';
import app from '../../dist/app';
import models from '../../dist/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;

let adminToken, userToken;

describe('OLMS', () => {
  it('loads the home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('OLMS', () => {
  models
    .user
    .destroy({
      cascade: true,
      truncate: true
    });

  it('creates a new admin user with fullname and email', (done) => {
    request(app)
      .post('/api/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.adminUser)
      .expect(201)
      .end((err, res) => {
        expect(res.body.regUser).to.have.property('fullName');
        expect(res.body.regUser).to.have.property('email');
        expect(res.body.regUser.isAdmin).to.equal(true);
        if (err) return done(err);
        done();
      });
  });

  it('creates a new regular user with fullname and email', (done) => {
    request(app)
      .post('/api/users/signup')
      .set('Content-Type', 'application/json')
      .send(fakeData.userOne)
      .expect(201)
      .end((err, res) => {
        expect(res.body.regUser).to.have.property('fullName');
        expect(res.body.regUser).to.have.property('email');
        expect(res.body.regUser.isAdmin).to.equal(false);
        if (err) return done(err);
        done();
      });
  });

  it('validates login for the admin created', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({
        email: 'admin@yahoo.com',
        password: 'admin'
      })
      .expect(200)
      .end((err, res) => {
        adminToken = res.body.token;
        expect(adminToken);
        expect(res.body.message).to.equal('Welcome admin');
        if (err) return done(err);
        done();
      });
  });

  it('validates login for the user created', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({
        email: 'user@yahoo.com',
        password: 'user'
      })
      .expect(200)
      .end((err, res) => {
        userToken = res.body.token;
        expect(userToken);
        expect(res.body.message).to.equal('Welcome user');
        if (err) return done(err);
        done();
      });
  });

  it('validates that Users require a token to see all available books', (done) => {
    request(app)
      .get('/api/books')
      .set('authorization', userToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
