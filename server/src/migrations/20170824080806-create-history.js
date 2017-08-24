/**
* This function creates a new
* table that holds all rented books
*/

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {
          model: 'user',
          key: 'userId'
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {
          model: 'book',
          key: 'bookId'
        }
      },
      returned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('histories');
  }
};
