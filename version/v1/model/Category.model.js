const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Category = sequelize.define(
  "category",
  {
    categoryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = Category;
