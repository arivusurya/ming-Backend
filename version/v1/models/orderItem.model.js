const Sequelize = require("sequelize");
const db = require("./index");
const Order = require("./order.model");
const Product = require("./product.model");

const OrderItem = db.define(
  "orderItems",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      field: "orderId",
      type: Sequelize.DataTypes.STRING,
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
  },
  {
    timestamps: false,
    tableName: "orderItems",
  }
);

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  targetKey: "orderId",
  constraints: false,
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "productId",
  constraints: false,
});

module.exports = OrderItem;
