'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reqHistory = _models2.default.history;
var Book = _models2.default.book;

/* Check for users yet to return a book */
var check = function check(req, res) {
  if (req.query.returned) {
    reqHistory.findAll({
      where: {
        userId: req.params.userId,
        returned: req.query.returned
      } }).then(function (books) {
      return res.status(200).send(books);
    }).catch(function () {
      return res.status(404).send({
        message: 'User Not Found!'
      });
    });
  }
};

/* Borrow a book */
var borrowBook = function borrowBook(req, res) {
  Book.findOne({
    where: {
      id: req.body.bookId
    }
  }).then(function () {
    reqHistory.create({
      userId: req.params.userId,
      bookId: req.body.bookId
    }).then(function (borrowed) {
      return res.send({
        message: 'A book has been borrowed',
        borrowed: borrowed
      });
    }).catch(function () {
      return res.status(404).send({
        message: 'User not found!'
      });
    });
  }).catch(function () {
    return res.status(404).send({
      message: 'This book is not registered!'
    });
  });
};

/* Return a Book */
var returnBook = function returnBook(req, res) {
  var updateFields = {};
  reqHistory.findOne({
    where: {
      userId: req.params.userId,
      bookId: req.body.bookId
    }
  }).then(function (foundUser) {
    if (req.body.returned) {
      updateFields.returned = req.body.returned;
    }
    foundUser.update(updateFields).then(function (returnedBook) {
      return res.send({
        message: 'Successfully Returned',
        returnedBook: returnedBook
      });
    }).catch(function () {
      return res.status(404).send({
        message: 'An error occured sending record to database!'
      });
    });
  }).catch(function () {
    return res.status(404).send({
      message: 'Record Not Found!'
    });
  });
};

/* Exports all methods */
exports.default = {
  check: check,
  borrowBook: borrowBook,
  returnBook: returnBook
};