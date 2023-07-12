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
    count: {
      field: "count",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
      allowNull: false,
      expires: 30 * 1000, // Token expires after 30 seconds
    },
  },
  {
    timestamps: false,
    tableName: "shiptokens", // Adjust the table name as per your setup
  }
);

module.exports = ShipToken;
