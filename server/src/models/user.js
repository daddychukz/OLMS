/**
* This function creates the model of
* Users table in the database, specifying
* relationships, datatypes and constraints.
* 
*/
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    memLevel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.BLOB,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { hooks: {
    beforeCreate: (newUser) => {
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
    },
    afterUpdate: (newUser) => {
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
    }
  } });
  return user;
};
