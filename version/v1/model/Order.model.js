const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User.model");
const Product = require("./Product.model");

const Order = sequelize.define(
    "Order",
    {
      orderId: {
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
      hasCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: true, freezeTableName: true }
  );
  
  

Order.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Order, { foreignKey: "userid" });

Order.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Order, { foreignKey: "productId" });

module.exports = Order;
