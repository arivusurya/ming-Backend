const Sequelize = require("sequelize");
const db = require("../models/index");

const Address = require("../models/address.model");

const constantUtils = require("../utils/constant.utils");

const User = db.define(
  "users",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      required: true,
    },
    addressId: {
      field: "addressId",
      type: Sequelize.DataTypes.INTEGER,
    },
    userName: {
      field: "userName",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    email: {
      field: "email",
      type: Sequelize.DataTypes.STRING,
      required: true,
    },
    password: {
      field: "password",
      type: Sequelize.DataTypes.STRING,
    },
    confirmPassword: {
      field: "confirmPassword",
      type: Sequelize.DataTypes.STRING,
    },
    phoneNumber: {
      field: "phoneNumber",
      type: Sequelize.DataTypes.STRING,
    },
    accessToken: {
      field: "accessToken",
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
      type: Sequelize.DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    lastLoginTime: {
      filed: "lastLoginTime",
      type: Sequelize.DataTypes.DATE,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
      enum: [constantUtils.ACTIVE, constantUtils.INACTIVE],
      defaultValue: constantUtils.ACTIVE,
    },
    verified: {
      field: "verified",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

User.hasMany(Address, {
  foreignKey: "userId",
  sourceKey: "userId",
});

Address.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "userId",
  constraints: false,
});

module.exports = User;
