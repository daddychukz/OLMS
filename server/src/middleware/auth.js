import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = 'kuasdfasbchbs1231';

const Auth = {
  // function to authenticate access to users with a token
  verify(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
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
  isAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
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

export default Auth;
