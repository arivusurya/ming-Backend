const Sequelize = require("sequelize");
const constantUtils = require("../utils/constant.utils");
const db = require("./index");

const Discount = db.define(
  "discounts",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    discountId: {
      field: "discount_id",
      type: Sequelize.DataTypes.INTEGER,
    },
    offerType: {
      field: "offer_type",
      type: Sequelize.DataTypes.STRING,
    },
    discountCode: {
      field: "discount_code",
      type: Sequelize.DataTypes.STRING,
    },
    amount: {
      field: "amount",
      type: Sequelize.DataTypes.INTEGER,
    },
    startDate: {
      field: "start_date",
      type: Sequelize.DataTypes.DATE,
    },
    endDate: {
      field: "end_date",
      type: Sequelize.DataTypes.DATE,
    },
    status: {
      field: "status",
      type: Sequelize.DataTypes.STRING,
      defaultValue: constantUtils.ACTIVE,
    },
    addedBy: {
      field: "added_by",
      type: Sequelize.DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "discounts",
  }
);

module.exports = Discount;
