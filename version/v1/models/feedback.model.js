const Sequelize = require("sequelize");
const db = require("./index");

const Feedback = db.define(
  "feedBacks",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userName: {
      field: "userName",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: "email",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      field: "phoneNumber",
      type: Sequelize.DataTypes.STRING,
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
    subject: {
      field: "subject",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    message: {
      field: "message",
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "feed_backs",
  }
);

module.exports = Feedback;
