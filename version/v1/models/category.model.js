const Sequelize = require("sequelize");
const db = require("../models/index");

const Category = db.define("categories", {
  id: {
    field: "id",
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  categoryId: {
    field: "categoryId",
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    field: "name",
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  image: {
    field: "image",
    type: Sequelize.DataTypes.STRING,
  },
  dateTime: {
    field: "dateTime",
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  addedBy: {
    field: "addedBy",
    type: Sequelize.DataTypes.INTEGER,
  },
  status: {
    field: "status",
    type: Sequelize.DataTypes.STRING,
    defaultValue: constantUtils.ACTIVE,
  },
});

module.exports = Category;
