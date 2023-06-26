const Sequelize = require("sequelize");
const db = require("./index");
const Cart = require("../models/cart.model");

const ProductPurchaseTotal = db.define(
  "ProductPurchaseTotals",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    purchaseId: {
      field: "purchaseId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      field: "price",
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
    actionBy: {
      field: "actionBy",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "total_purchases",
  }
);

ProductPurchaseTotal.belongsTo(Cart, {
  foreignKey: "purchaseId",
  targetKey: "purchaseId",
  constraint: false,
});

module.exports = ProductPurchaseTotal;
