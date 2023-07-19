const Sequelize = require("sequelize");
const db = require("./index");

const ShipToken = db.define(
  "shiptokens",
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
      type: Sequelize.DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "shiptokens", // Adjust the table name as per your setup
  }
);

module.exports = ShipToken;
