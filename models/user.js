'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: 'Cart', foreignKey: 'productId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'email is required'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'password is required'
      },
      notEmpty: {
        args: true,
        msg: 'password is required'
      } 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'role is required'
        },
        notEmpty: {
          args: true,
          msg: 'role is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, opt) => {
    user.password = hashPass(user.password)
  })
  return User;
};