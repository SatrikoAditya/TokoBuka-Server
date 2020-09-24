'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {through: 'Cart', foreignKey: 'userId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name is required'
        },
        notEmpty: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image url is required'
        },
        notEmpty: {
          args: true,
          msg: 'image url is required'
        }
      } 
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price is required'
        },
        notEmpty: {
          args: true,
          msg: 'price is required'
        },
        min: {
          args: [0],
          msg: 'must be a non-negative number'
        },
        isInt: {
          args: true,
          msg: 'only allow number format'
        }
      } 
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'stock is required'
        },
        min: {
          args: [0],
          msg: 'must be a non-negative number'
        },
        isInt: {
          args: true,
          msg: 'only allow number format'
        }
      } 
    } 
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};