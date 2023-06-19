const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const Review = require("./Review.model");

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNum: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;
