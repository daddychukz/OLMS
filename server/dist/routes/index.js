'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _book = require('../controller/book');

var _book2 = _interopRequireDefault(_book);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _history = require('../controller/history');

var _history2 = _interopRequireDefault(_history);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
// const router = require('express').Router();

router.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Online Library Management System'
  });
});

/* All API Routes */

// Register a new User
router.post('/api/users/signup', _user2.default.register);

// Login route
router.post('/api/users/signin', _user2.default.login);

// Get all books
router.get('/api/books', _auth2.default.verify, _book2.default.retrieveAll);

// Find book by ID
router.get('/api/books/:bookId', _auth2.default.verify, _book2.default.retrieve);

// Borrow a book
router.post('/api/users/:userId/books', _auth2.default.verify, _history2.default.borrowBook);

// Return a book
router.put('/api/users/:userId/returnbook', _auth2.default.verify, _history2.default.returnBook);

// Get all Books a user borrowed but hasn't returned
router.get('/api/users/:userId/books', _auth2.default.verify, _history2.default.check);

// Add a book
router.post('/api/books', _auth2.default.isAdmin, _book2.default.create);

// Update a book by ID
router.put('/api/books/:bookId', _auth2.default.isAdmin, _book2.default.updateBook);

// Delete a Book by ID
router.delete('/api/books/:bookId', _auth2.default.isAdmin, _book2.default.deleteBook);

// A catch-all routes not define.
router.get('*', function (req, res) {
  return res.status(404).send('Invalid Route...');
});

router.delete('*', function (req, res) {
  return res.status(404).send('Invalid Route...');
});

router.post('*', function (req, res) {
  return res.status(404).send('Invalid Route...');
});

router.put('*', function (req, res) {
  return res.status(404).send('Invalid Route...');
});

exports.default = router;