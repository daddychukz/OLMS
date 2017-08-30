'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.user;
require('dotenv').config();

var secret = process.env.SECRET;

/* Register a User */
var register = function register(req, res) {
  return User.create({
    // userId: req.body.userId,
    fullName: req.body.fullName,
    email: req.body.email,
    sex: req.body.sex,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    memLevel: req.body.memLevel,
    isAdmin: req.body.isAdmin
  }).then(function (regUser) {
    return res.status(201).send({
      message: 'User Successfully Registered',
      regUser: regUser
    });
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

/* sign into the App */
var login = function login(req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (user) {
      _bcrypt2.default.compare(req.body.password, user.password, function (err, response) {
        if (response) {
          var token = _jsonwebtoken2.default.sign({
            username: user.userName,
            isAdmin: user.isAdmin
          }, secret, { expiresIn: '24h' });
          return res.status(200).send({
            message: 'Welcome ' + user.userName,
            token: token });
        }
        return res.status(400).send({ message: 'Username or password incorrect' });
      });
    } else {
      res.status(404).send({
        message: 'This record does not exists!'
      });
    }
  });
};

exports.default = {
  register: register,
  login: login
};