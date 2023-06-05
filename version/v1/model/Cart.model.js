const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User.model");
const Product = require("./Product.model");

const Cart = sequelize.define(
    "Cart",
    {
      cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "userid",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product,
          key: "productId",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    { timestamps: true, freezeTableName: true }
  );
  
  

Cart.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Cart, { foreignKey: "userid" });

Cart.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Cart, { foreignKey: "productId" });

module.exports = Cart;
