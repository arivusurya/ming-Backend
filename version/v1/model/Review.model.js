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
  comment: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
});

Review.belongsTo(Product, { foreignKey: "productId" });

module.exports = Review;
