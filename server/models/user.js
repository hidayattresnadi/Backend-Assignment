'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "user name is already exist"
      },
      validate: {
        notEmpty: {
          msg: "user name required"
        },
        notNull: {
          msg: "user name required"
        },
        len: {
          args: [2],
          msg: "user name should have at least 2 characters"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password required"
        },
        notNull: {
          msg: "password required"
        },
        len: {
          args: [5],
          msg: "password should have at least 5 characters"
        }
      }
    },
    fullName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password)
  })
  return User;
};