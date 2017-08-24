
const Book = require('../models').book;

/* Add new books */
const create = (req, res) => Book
  .create({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    units: req.body.units
  })
  .then(book => res.status(200).send(book))
  .catch(err => res.status(400).send(err));

  /* Get all books in the library */
const retrieveAll = (req, res) => Book
  .all()
  .then(book => res.status(200).send(book))
  .catch(err => res.status(400).send(err));

  /* Get a Single Book */
const retrieve = (req, res) => Book
  .findById(req.params.bookId)
  .then((book) => {
    if (!book) {
      return res.status(404).send({
        message: 'Book Not Found!',
      });
    }
    return res.status(200).send(book);
  })
  .catch(err => res.status(400).send(err));

  /* Update Books */
const updateBook = (req, res) => {
  const updateFields = {};
  Book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
    .then((foundBook) => {
      if (foundBook === null) {
        return res.status(404).send({
          message: 'This record does not exists!',
        });
      }

      if (req.body.title) {
        updateFields.title = req.body.title;
      }

      if (req.body.author) {
        updateFields.author = req.body.author;
      }

      if (req.body.category) {
        updateFields.category = req.body.category;
      }

      if (req.body.units) {
        updateFields.units = req.body.units;
      }

      foundBook.update(updateFields)
        .then(updatedBook => res.send({
          message: 'Successfully Updated',
          updatedBook
        }));
    });
};

/* Delete a Book */
const deleteBook = (req, res) => Book
  .findById(req.params.bookId)
  .then((book) => {
    if (!book) {
      return res.status(404).send({
        message: 'This record was not found!',
      });
    }
    return book
      .destroy()
      .then(deletedBook => res.send({
        message: 'Record Successfully Deleted',
        deletedBook
      }))
      .catch(error => res.status(400).send(error));
  });

  /* Export all methods */
module.exports = {
  create,
  retrieveAll,
  retrieve,
  updateBook,
  deleteBook
};
