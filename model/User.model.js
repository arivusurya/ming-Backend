const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;
