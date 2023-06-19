const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const Model = require(".");
const User = require("./User.model");
const Product = require("./Product.model");

const Review = sequelize.define("Review", {
  Reviewid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  comment: {
    type: DataTypes.STRING,
  },
});
Review.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Review);
module.exports = Review;
