const router = require('express').Router();

const booksController = require('../controller/book');
const userController = require('../controller/user');
const requestController = require('../controller/history');
const { Auth } = require('../middleware/auth');

/* GET home page. */
router.get('/', (req, res) =>
  res.status(200).send({
    message: 'Online Library Management System',
  })
);

/* All API Routes */

// Add a book
router.post('/api/books', booksController.create);

// Get all books
router.get('/api/books', booksController.retrieveAll);

// Find book by ID
router.get('/api/books/:bookId', booksController.retrieve);

// Update a book by ID
router.put('/api/books/:bookId', booksController.updateBook);

// Delete a Book by ID
router.delete('/api/books/:bookId', booksController.deleteBook);

// Register a new User
router.post('/api/users/signup', userController.register);

// Login route
router.post('/api/users/signin', userController.login);

// Borrow a book
router.post('/api/users/:userId/books', requestController.borrowBook);

// Return a book
router.put('/api/users/:userId/returnbook', requestController.returnBook);

// Get all Books a user borrowed but hasn't returned
router.get('/api/users/:userId/books', requestController.check);

// A catch-all routes not define.
router.get('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

router.delete('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

router.post('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

router.put('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

module.exports = router;
