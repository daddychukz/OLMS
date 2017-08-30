/**
* This function create model of the
* Rent History table in the database specifying
* relationships, datatypes and constraints.
*/

export default (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    bookId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return history;
};
