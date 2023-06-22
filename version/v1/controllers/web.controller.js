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

module.exports = controller;
