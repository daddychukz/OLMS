
import db from '../models';

const reqHistory = db.history;
const Book = db.book;

/* Check for users yet to return a book */
const check = (req, res) => {
  if (req.query.returned) {
    reqHistory.findAll({
      where: {
        userId: req.params.userId,
        returned: req.query.returned
      } })
      .then(books =>
        res.status(200).send(books)
      )
      .catch(() => res.status(404).send({
        message: 'User Not Found!'
      }));
  }
};

/* Borrow a book */
const borrowBook = (req, res) => {
  Book.findOne({
    where: {
      id: req.body.bookId
    },
  })
    .then(() => {
      reqHistory
        .create({
          userId: req.params.userId,
          bookId: req.body.bookId,
        })
        .then(borrowed => res.send({
          message: 'A book has been borrowed',
          borrowed
        }))
        .catch(() => res.status(404).send({
          message: 'User not found!'
        }));
    }
    )
    .catch(() => res.status(404).send({
      message: 'This book is not registered!'
    }));
};

/* Return a Book */
const returnBook = (req, res) => {
  const updateFields = {};
  reqHistory.findOne({
    where: {
      userId: req.params.userId,
      bookId: req.body.bookId
    },
  })
    .then((foundUser) => {
      if (req.body.returned) {
        updateFields.returned = req.body.returned;
      }
      foundUser.update(updateFields)
        .then(returnedBook => res.send({
          message: 'Successfully Returned',
          returnedBook
        }))
        .catch(() => res.status(404).send({
          message: 'An error occured sending record to database!'
        }));
    })
    .catch(() => res.status(404).send({
      message: 'Record Not Found!'
    }));
};

/* Exports all methods */
export default {
  check,
  borrowBook,
  returnBook
};
