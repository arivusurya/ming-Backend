const Sequelize = require("sequelize");
const db = require("../models/index");

const Category = require("../models/category.model");

const Product = db.define(
  "products",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      field: "productId",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
    },
    categoryId: {
      field: "categoryId",
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      field: "name",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    description: {
      field: "description",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    weight: {
      field: "weight",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    type: {
      field: "type",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    price: {
      field: "price",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
    },
    dateTime: {
      field: "dateTime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
      enum: [constantUtils.ACTIVE, constantUtils.INACTIVE],
      defaultValue: constantUtils.ACTIVE,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  targetKey: "categoryId",
  constraints: false,
});

module.exports = Product;
