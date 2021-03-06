import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

const User = db.user;
require('dotenv').config();

const secret = 'kuasdfasbchbs1231';

/* Register a User */
const register = (req, res) => User
  .create({
    // userId: req.body.userId,
    fullName: req.body.fullName,
    email: req.body.email,
    sex: req.body.sex,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    memLevel: req.body.memLevel,
    isAdmin: req.body.isAdmin
  })
  .then(regUser => res.status(201).send({
    message: 'User Successfully Registered',
    regUser
  }))
  .catch(err => res.status(400).send(err));

/* sign into the App */
const login = (req, res) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({
              username: user.userName,
              isAdmin: user.isAdmin
            }, secret, { expiresIn: '24h' });
            return res.status(200).send({
              message: `Welcome ${user.userName}`,
              token });
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

export default {
  register,
  login
};
