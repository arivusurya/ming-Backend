const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User.model");
const Product = require("./Product.model");

const Order = sequelize.define(
  "Orders",
  {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
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
    reciptID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.STRING,
    },
    hasPaid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },

  { timestamps: true, freezeTableName: true }
);

Order.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Order, { foreignKey: "userid" });

Order.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Order, { foreignKey: "productId" });

module.exports = Order;
