const Sequelize = require("sequelize");
const db = require("./index");
const Product = require("./product.model");
const constantUtils = require("../utils/constant.utils");

const Review = db.define(
  "reviews",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
    },
    productId: {
      field: "productId",
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      field: "name",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: "email",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    review: {
      field: "review",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    star: {
      field: "star",
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
      defaultValue: constantUtils.ACTIVE,
      enum: [constantUtils.ACTIVE, constantUtils.INACTIVE],
    },
  },
  {
    timestamps: false,
    tableName: "reviews",
  }
);

Review.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "productId",
  constraints: false,
});

module.exports = Review;
