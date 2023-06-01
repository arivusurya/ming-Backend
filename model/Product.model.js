const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");

const Product = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Product;
