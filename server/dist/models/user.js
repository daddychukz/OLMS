'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Enter a Valid Email' }
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: { msg: 'Must be Numeric' },
        not: {
          args: ['[a-z]', 'i'],
          msg: 'Only Numeric Entries'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [4, 5],
        msg: 'Password must be between 4 to 5 characters at length'
      }
    },
    memLevel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.BLOB
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { hooks: {
      beforeCreate: function beforeCreate(newUser) {
        newUser.password = _bcrypt2.default.hashSync(newUser.password, _bcrypt2.default.genSaltSync(8));
      },
      afterUpdate: function afterUpdate(newUser) {
        newUser.password = _bcrypt2.default.hashSync(newUser.password, _bcrypt2.default.genSaltSync(8));
      }
    } });
  user.associate = function (models) {
    // associations can be defined here
    user.belongsToMany(models.book, {
      through: models.history,
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };
  return user;
}; /**
   * This function creates the model of
   * Users table in the database, specifying
   * relationships, datatypes and constraints.
   * 
   */