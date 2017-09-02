// const router = require('express').Router();

import express from 'express';
import booksController from '../controller/book';
import userController from '../controller/user';
import requestController from '../controller/history';
import Auth from '../middleware/auth';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>
  res.status(200).send({
    message: 'Online Library Management System',
  })
);

/* All API Routes */
/**
* @swagger
* definitions:
*   Signup:
*     type: object
*     properties:
*       fullName:
*         type: string
*       email:
*         type: string
*         format: email
*       sex:
*         type: string
*       userName:
*         type: string
*       phoneNumber:
*         type: number
*       password:
*         type: string
*         format: password
*       memLevel:
*         type: string
*     example:
*       fullName: Adam Eve
*       email: example@example.com
*       sex: male
*       userName: username
*       phoneNumber: 08011111111
*       password: password
*       memLevel: Silver
*/

/**
 * @swagger
 * definitions:
 *    bookID:
 *      example:
 *        bookId: bf04f9e0-6d00-409f-bed4-a0c20e31eca9
*/

/**
* @swagger
* definitions:
*   Signin:
*     properties:
*       email:
*         type: string
*         format: email
*       password:
*         type: string
*         format: password
*     example:
*       email: example@example.com
*       password: password
*/

/**
* @swagger
* definitions:
*   Books:
*     properties:
*       title:
*         type: string
*       author:
*         type: string
*       category:
*         type: string
*       units:
*         type: number
*     example:
*       title: Chemistry
*       author: Ababio
*       category: Science
*       units: 3
*/

// Register a new User
/**
* @swagger
* /api/v1/users/signup:
*   post:
*     tags:
*       - Users
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Registration
*         description: Enter your details as shown in the example to the right
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signup'
*     responses:
*       200:
*         description: Successfully Registered
*/
router.post('/api/v1/users/signup', userController.register);

// Login route
/**
* @swagger
* /api/users/signin:
*   post:
*     tags:
*       - Users
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signin'
*     responses:
*       200:
*         description: Successful
*/
router.post('/api/users/signin', userController.login);

// Get all books
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/books:
*   get:
*     tags:
*       - Books
*     description: Returns all Books
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     responses:
*       200:
*         description: Successful
*         schema:
*           $ref: '#/definitions/Books'
*/
router.get('/api/books', Auth.verify, booksController.retrieveAll);

// Find book by ID
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/books/{bookId}:
*   get:
*     tags:
*       - Books
*     description: Returns a single Book
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: bookId
*         description: Book's id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successful
*         schema:
*           
*/
router.get('/api/books/:bookId', Auth.verify, booksController.retrieve);

// Borrow a book
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/users/{userId}/books:
*   post:
*     tags:
*       - Books
*     description: Borrow a book
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: userId
*         description: Enter User ID
*         in: path
*         required: true
*         type: string
*       - name: bookId
*         description: Click the example on the right and Enter Book ID
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/bookID'
*     responses:
*       200:
*         description: Successful
*/
router.post('/api/users/:userId/books', Auth.verify, requestController.borrowBook);

// Return a book
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/users/{userId}/returnbook:
*   put:
*     tags:
*       - Books
*     description: Return a Borrowed book
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: userId
*         description: Enter User ID
*         in: path
*         required: true
*         type: string
*       - name: bookId
*         description: Click the example on the right and Enter Book ID
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/bookID'
*     responses:
*       200:
*         description: Successful
*/
router.put('/api/users/:userId/returnbook', Auth.verify, requestController.returnBook);

// Get all Books a user borrowed but hasn't returned
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/users/{userId}/books:
*   get:
*     tags:
*       - Books
*     description: Get books yet to be returned by a User
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: userId
*         description: Enter User ID
*         in: path
*         required: true
*         type: string
*       - name: returned
*         description: Enter "False" or "0"
*         in: query
*         required: true
*         type: string
*         schema:
*     responses:
*       200:
*         description: Successful
*/
router.get('/api/users/:userId/books', Auth.verify, requestController.check);

// Add a book
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/books:
*   post:
*     tags:
*       - Books
*     description: Add a new Book
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: Add a Book
*         description: Click on the example to the right and enter new book details
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Books'
*     responses:
*       200:
*         description: Successful
*/
router.post('/api/books', Auth.isAdmin, booksController.create);

// Update a book by ID
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/books/{bookId}:
*   put:
*     tags:
*       - Books
*     description: Update a Book Information
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: bookId
*         description: Enter Book ID
*         in: path
*         required: true
*         type: string
*       - name: Book Details
*         description: Click on the example to the right and specify field to update
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Books'
*     responses:
*       200:
*         description: Successful
*/
router.put('/api/books/:bookId', Auth.isAdmin, booksController.updateBook);

// Delete a Book by ID
/**
* @swagger
*  securityDefinitions: 
*    ApiKeyAuth: 
*      type: apiKey
*      in: header
*      name: authorization
* /api/books/{bookId}:
*   delete:
*     tags:
*       - Books
*     description: Delete a Book From Library
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: bookId
*         description: Enter Book ID to be deleted
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successful
*/
router.delete('/api/books/:bookId', Auth.isAdmin, booksController.deleteBook);

// // A catch-all routes not define.
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

export default router;
