const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const Category = require("./Category.model");
const Review = require("./Review.model");

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
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "categoryid",
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

Product.belongsTo(Category, { foreignKey: "categoryid" });
Category.hasMany(Product, { foreignKey: "categoryid" });

module.exports = Product;
