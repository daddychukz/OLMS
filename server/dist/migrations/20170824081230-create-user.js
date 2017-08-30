'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
      return queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        fullName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        sex: {
          type: Sequelize.STRING,
          allowNull: false
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        phoneNumber: {
          type: Sequelize.BIGINT,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        memLevel: {
          type: Sequelize.STRING,
          allowNull: false
        },
        photo: {
          type: Sequelize.BLOB
        },
        isAdmin: {
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
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('users');
  }
};