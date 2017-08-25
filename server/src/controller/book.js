const Book = require('../models').book;

/* Add new books */
const create = (req, res) => Book
  .create({
    bookId: req.body.bookId,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    units: req.body.units
  })
  .then(book => res.status(200).send({
    message: 'Book Successfully Added',
    book }))
  .catch(err => res.status(400).send(err));

  /* Get all books in the library */
const retrieveAll = (req, res) => Book
  .all()
  .then(book => res.status(200).send(book))
  .catch(err => res.status(400).send(err));

  /* Get a Single Book */
const retrieve = (req, res) => {
  Book
    .findById(req.params.bookId)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch(() => res.status(404).send({
      message: 'Book Not Found!'
    }));
};

/* Update Books */
const updateBook = (req, res) => {
  const updateFields = {};
  Book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
    .then((foundBook) => {
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

      foundBook.update(updateFields)
        .then(updatedBook => res.send({
          message: 'Successfully Updated',
          updatedBook
        }));
    })
    .catch(() => res.status(404).send({
      message: 'Record Not Found!'
    }));
};

/* Delete a Book */
const deleteBook = (req, res) => Book
  .findById(req.params.bookId)
  .then((book) => {
    book
      .destroy()
      .then(res.send({
        message: 'Record Successfully Deleted',
      }))
      .catch(error => res.status(400).send(error));
  })
  .catch(() => res.status(404).send({
    message: 'Record Not Found!'
  }));

  /* Export all methods */
module.exports = {
  create,
  retrieveAll,
  retrieve,
  updateBook,
  deleteBook
};
