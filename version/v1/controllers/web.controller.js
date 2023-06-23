const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");

const helperUtils = require("../utils/helperUtils");
const authUtils = require("../utils/auth.utils");
const constantUtils = require("../utils/constant.utils");
const structureUtils = require("../utils/structure.utils");
const sequelize = require("../models");

controller = {};

controller.getProductByCategory = handler(async (req, res) => {
  const product = await Product.findAll({
    where: {
      categoryId: req?.body?.categoryId,
      status: constantUtils.ACTIVE,
    },
  });
  if (!product) throw "400|Product_Not_Found!";

  return res.json(
    product?.map((each) => structureUtils.webProductStructure(each))
  );
});

controller.getSingleProductById = handler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      productId: req?.body?.productId,
      status: constantUtils.ACTIVE,
    },
  });
  if (!product) throw "400|Product_Not_Found!";

  return res.json(structureUtils.webProductStructure(product));
});

controller.getProducts = handler(async (req, res) => {
  const condition = {};

  if (req?.body?.search) {
    condition["name"] = sequelize.where(
      sequelize.fn("LOWER", sequelize.col("name")),
      "LIKE",
      "%" + req?.body?.search?.toLowerCase() + "%"
    );
  }

  condition["status"] = constantUtils.ACTIVE;

  const product = await Product.findAll({
    where: condition,
    order: [["id", "ASC"]],
  });

  return res.json(
    product?.map((each) => ({
      id: each?.id,
      productId: each?.productId,
      categoryId: req?.body?.categoryId,
      productName: each?.name,
      productImage: each?.image,
      description: req?.body?.description,
      weight: req?.body?.weight,
      type: req?.body?.type,
      price: req?.body?.price,
      date: each?.date,
      dateTime: each?.dateTime,
      status: each?.status,
    }))
  );
});

module.exports = controller;
