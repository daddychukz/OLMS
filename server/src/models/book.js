/**
* This function models the book table
* in the database specifying
* relationships, datatypes and constraints.
*/

export default (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Field must not be Empty' }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Field must not be Empty' }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Field must not be Empty' }
      }
    },
    units: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Field must not be Empty' }
      }
    },
  });
  book.associate = (models) => {
    // associations can be defined here
    book.belongsToMany(models.user, {
      through: models.history,
      foreignKey: {
        name: 'bookId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return book;
};
