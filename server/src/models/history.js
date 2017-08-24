/**
* This function create model of the
* Rent History table in the database specifying
* relationships, datatypes and constraints.
*/

module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      Reference: {
        model: 'user',
        key: 'userId'
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      Reference: {
        model: 'book',
        key: 'bookId'
      }
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return history;
};
