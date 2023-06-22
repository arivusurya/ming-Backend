const Sequelize = require("sequelize");
const db = require("./index");

const Admin = db.define(
  "admins",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    adminId: {
      field: "adminId",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
    },
    adminName: {
      field: "adminName",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      field: "email",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      field: "password",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      field: "accessToken",
      type: Sequelize.DataTypes.STRING,
    },
    image: {
      field: "image",
      type: Sequelize.DataTypes.STRING,
    },
    privilege: {
      field: "privilege",
      type: Sequelize.DataTypes.STRING(10000),
    },
    addedBy: {
      field: "addedBy",
      type: Sequelize.DataTypes.INTEGER,
    },
    dateTime: {
      field: "dateTime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    timestamps: false,
    tableName: "admins",
  }
);

module.exports = Admin;
