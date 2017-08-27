// /**
//  * API Endpoint Tests
//  */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const models = require('../src/models/');

const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

chai.use(chaiHttp);

describe('OLMS', () => {
  it('loads the home page', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res)
          .to
          .have
          .status(200);
        done();
      });
  });
});
