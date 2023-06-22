const Sequelize = require("sequelize");
const db = require("./index");

const constantUtils = require("../utils/constant.utils");

const Address = db.define(
  "addresss",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    addressId: {
      field: "addressId",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
    },
    address: {
      field: "address",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    apartment: {
      field: "apartment",
      type: Sequelize.DataTypes.STRING,
    },
    city: {
      field: "city",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    state: {
      field: "state",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    country: {
      field: "country",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    pinCode: {
      field: "pinCode",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    dateTime: {
      field: "dateTime",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    defaultStatus: {
      field: "defaultStatus",
      type: Sequelize.DataTypes.STRING,
      enum: [constantUtils.ACTIVE, constantUtils.INACTIVE],
      defaultValue: constantUtils.INACTIVE,
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
    tableName: "addresss",
  }
);

module.exports = Address;
