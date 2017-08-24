/**
* This function models the book table
* in the database specifying
* relationships, datatypes and constraints.
*/

module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    units: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
  });
  return book;
};
