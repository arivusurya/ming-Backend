const Sequelize = require("sequelize");
const db = require("./index");
const User = require("./user.model");

const Token = db.define(
  "tokens",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    token: {
      field: "token",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      field: "expiresAt",
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "tokens",
  }
);

Token.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "userId",
  constraints: false,
});

module.exports = Token;
