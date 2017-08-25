/**
* This function models the book table
* in the database specifying
* relationships, datatypes and constraints.
*/

module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
  book.associate = (models) => {
    // associations can be defined here
    book.belongsToMany(models.user, {
      through: models.history,
      foreignKey: {
        name: 'bookId',
        allowNull: false
      },
      onDelete: 'CASCADE',
    });
  };
  return book;
};
