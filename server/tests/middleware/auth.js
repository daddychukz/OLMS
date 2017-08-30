// /**
//  * API Endpoint Tests
//  */

import chai from 'chai';
import request from 'supertest';
import app from '../../../server';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;

let authToken;

describe('Middleware Authentication Tests', () => {
  before((done) => {
    models.user.create(fakeData.userOne)
      .then(() => {
        models.book.create(fakeData.book)
          .then(() => {
            request(app)
              .post('/api/users/signin')
              .send({
                email: fakeData.userOne.email,
                password: fakeData.userOne.password
              })
              .end((err, res) => {
                authToken = res.body.token;
                done();
              });
          });
      });
  });

  after(() =>
    models
      .book
      .destroy({
        cascade: true,
        truncate: true
      }),

  models
    .user
    .destroy({
      cascade: true,
      truncate: true
    })
  );

  it('grant access request for users to view books with valid token', (done) => {
    request(app)
      .get('/api/books')
      .set('authorization', authToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should not grant access request for users to view books without token', (done) => {
    request(app)
      .get('/api/books')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('No token provided');
        done();
      });
  });

  it('deny access to books request for users with invalid token', (done) => {
    const randomToken = 'kzsjvduvgdbvjask123bn';
    request(app)
      .get('/api/books')
      .set('Authorization', randomToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('You do not have Permission to this Page');
        done();
      });
  });
});
