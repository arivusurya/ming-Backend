const Sequelize = require("sequelize");

const db = require("./index");

const User = require("./user.model");
const Discount = require("./discount.model");

const DiscountUser = db.define(
  "discountusers",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: Sequelize.DataTypes.INTEGER,
    },
    discountId: {
      field: "discount_id",
      type: Sequelize.DataTypes.INTEGER,
    },
    discountCode: {
      field: "discount_code",
      type: Sequelize.DataTypes.STRING,
    },
    dateTime: {
      field: "date_time",
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "discountusers",
  }
);

DiscountUser.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "userId",
  constraints: false,
});

DiscountUser.belongsTo(Discount, {
  foreignKey: "discountId",
  targetKey: "discountId",
  constraints: false,
});

module.exports = DiscountUser;
