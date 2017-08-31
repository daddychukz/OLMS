'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var secret = 'kuasdfasbchbs1231';

var Auth = {
  // function to authenticate access to users with a token
  verify: function verify(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
      _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ message: 'You do not have Permission to this Page' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No token provided' });
    }
  },

  // function to authenticate access to Admin only with a token
  isAdmin: function isAdmin(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
      _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else if (decoded.isAdmin === true) {
          next();
        } else {
          res.status(401).send({ message: 'You do not have Permission to this Page' });
        }
      });
    } else {
      res.status(401).send({ message: 'No token provided' });
    }
  }
};

exports.default = Auth;