const { DataTypes, Sequelize, TIME } = require("sequelize");
const sequelize = require("../config/db.config");
const Model = require(".");
const Product = require("./Product.model");

const ProductDescription = sequelize.define(
    "ProductDescription",
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: Product,
          key: "productId",
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, freezeTableName: true }
  );


Product.hasOne(ProductDescription, { foreignKey: "productId" });
ProductDescription.belongsTo(Product, { foreignKey: "productId" });  

module.exports = ProductDescription;
