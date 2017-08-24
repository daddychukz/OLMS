const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const Auth = {
  verify(req, res, next) {
    if (req.headers.authorization) {
      next();
    } else {
      res.status(401).send({ message: 'You are currently unauthorized' });
    }
  },
  isAdmin(req, res, next) {
    const decoded = jwt.verify(req.headers.authorization, secret);
    if (decoded.isAdmin === true) {
      next();
    } else {
      res.status(401).send({ message: 'Access Denied! You are currently unauthorized' });
    }
  },
};

module.exports = {
  Auth
};
