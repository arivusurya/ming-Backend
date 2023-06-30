const Sequelize = require("sequelize");
const Product = require("../models/product.model");
const db = require("./index");

const Cart = db.define(
  "Cart",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      field: "productId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      field: "quantity",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    dateTime: {
      field: "dateTime",
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
      default: "active",
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Cart",
  }
);

Cart.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "productId",
  constraints: false,
});

module.exports = Cart;
