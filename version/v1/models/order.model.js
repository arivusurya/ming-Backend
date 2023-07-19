const Sequelize = require("sequelize");
const db = require("./index");
const Cart = require("./cart.model");
const Address = require("./address.model");
const constantUtils = require("../utils/constant.utils");
const utils = require("../utils/constant.utils");

const Order = db.define(
  "orders",
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
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    Productcost: {
      field: "Productcost",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    shippingCost: {
      field: "shippingCost",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      field: "amount",
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
    addressId: {
      field: "addressId",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
    hasPaid: {
      field: "hasPaid",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      enum: [constantUtils.PAID, constantUtils.PENDING, constantUtils.FAILED],
      defaultValue: constantUtils.PENDING,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      enum: [
        constantUtils.ACTIVEORDERS,
        constantUtils.PROCESSING,
        constantUtils.DELIVERED,
        utils.INACTIVEORDERS,
      ],
      defaultValue: constantUtils.INACTIVEORDERS,
    },
    shippingMethod: {
      field: "shippingMethod",
      type: Sequelize.DataTypes.STRING,
    },
    isFreeShipping: {
      field: "isFreeShipping",
      type: Sequelize.DataTypes.STRING,
      enum: [constantUtils.FreeShiping, constantUtils.PaidShipping],
    },
    paymentId: {
      field: "paymentId",
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "orders",
  }
);

Order.belongsTo(Address, {
  foreignKey: "addressId",
  targetKey: "addressId",
  constraints: false,
});

module.exports = Order;
