'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.book;

/* Add new books */
var create = function create(req, res) {
  return Book.create({
    bookId: req.body.bookId,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    units: req.body.units
  }).then(function (book) {
    return res.status(200).send({
      message: 'Book Successfully Added',
      book: book });
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

/* Get all books in the library */
var retrieveAll = function retrieveAll(req, res) {
  return Book.all().then(function (book) {
    return res.status(200).send(book);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

/* Get a Single Book */
var retrieve = function retrieve(req, res) {
  Book.findById(req.params.bookId).then(function (book) {
    res.status(200).send(book);
  }).catch(function () {
    return res.status(404).send({
      message: 'Book Not Found!'
    });
  });
};

/* Update Books */
var updateBook = function updateBook(req, res) {
  var updateFields = {};
  Book.findOne({
    where: {
      id: req.params.bookId
    }
  }).then(function (foundBook) {
    if (req.body.title) {
      updateFields.title = req.body.title;
    } else if (req.body.bookId) {
      updateFields.bookId = req.body.bookId;
    } else if (req.body.author) {
      updateFields.author = req.body.author;
    } else if (req.body.category) {
      updateFields.category = req.body.category;
    } else if (req.body.units) {
      updateFields.units = req.body.units;
    }

    foundBook.update(updateFields).then(function (updatedBook) {
      return res.send({
        message: 'Successfully Updated',
        updatedBook: updatedBook
      });
    });
  }).catch(function () {
    return res.status(404).send({
      message: 'Record Not Found!'
    });
  });
};

/* Delete a Book */
var deleteBook = function deleteBook(req, res) {
  return Book.findById(req.params.bookId).then(function (book) {
    book.destroy().then(res.send({
      message: 'Record Successfully Deleted'
    })).catch(function (error) {
      return res.status(400).send(error);
    });
  }).catch(function () {
    return res.status(404).send({
      message: 'Record Not Found!'
    });
  });
};

/* Export all methods */
exports.default = {
  create: create,
  retrieveAll: retrieveAll,
  retrieve: retrieve,
  updateBook: updateBook,
  deleteBook: deleteBook
};