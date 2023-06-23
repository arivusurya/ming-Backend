const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");

const helperUtils = require("../utils/helperUtils");
const authUtils = require("../utils/auth.utils");
const constantUtils = require("../utils/constant.utils");

controller = {};

controller.addAdmin = handler(async (req, res) => {
  const adminId = parseInt(helperUtils.generateRandomNumber(8));
  const admin = await Admin.create({
    adminId: adminId,
    adminName: req?.body?.adminName,
    email: req?.body?.email,
    password: req?.body?.password,
    accessToken: authUtils.adminToken(adminId),
    image: req?.body?.image,
    addedBy: req?.admin?.adminId,
    dateTime: new Date(),
    privilege: req?.body?.privilege,
  });
  if (!admin) throw "400|Somthing_Went_Wrong!";
  return res.json({
    messsage: "success!",
  });
});

controller.addProductCategory = handler(async (req, res) => {
  const categoryId = parseInt(helperUtils.generateRandomNumber(8));
  const category = await Category.create({
    categoryId: categoryId,
    name: req?.body?.name,
    image: req?.body?.image,
    addedBy: req?.admin?.adminId,
  });
  if (!category) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success!",
  });
});

controller.addproduct = handler(async (req, res) => {
  const productId = parseInt(helperUtils?.generateRandomNumber(8));

  const product = await Product.create({
    productId: productId,
    categoryId: req?.body?.categoryId,
    name: req?.body?.name,
    description: req?.body?.description,
    image: req?.body?.image,
    weight: req?.body?.weight,
    type: req?.body?.type,
    price: req?.body?.price,
    addedBy: req?.admin?.adminId,
  });

  if (!product) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success!",
  });
});

module.exports = controller;
