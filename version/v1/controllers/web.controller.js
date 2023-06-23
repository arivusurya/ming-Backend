const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");
const ProductPurchase = require("../models/purchase.model");
const TotalPurchase = require("../models/total.purchase.model");

const helperUtils = require("../utils/helperUtils");
const authUtils = require("../utils/auth.utils");
const constantUtils = require("../utils/constant.utils");
const structureUtils = require("../utils/structure.utils");
const sequelize = require("../models");
const { Op } = require("sequelize");

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

controller.purchaseProduct = handler(async (req, res) => {
  if (!req?.body?.userId) throw "400|User_Id_Requried!";
  if (req?.body?.products?.length === 0) throw "400|No_Product_Found!";
  if (!Array.isArray(req?.body?.products)) throw "400|Array_Only!";

  const user = await User.findOne({
    userId: req?.user?.userId,
  });

  if (!user) throw "400|User_Not_Found!";

  let purchaseId = "";

  while (!purchaseId) {
    purchaseId = parseInt(helperUtils.generateRandomNumber(8));
    const ifIdExists = await TotalPurchase.count({
      where: {
        purchaseId,
      },
    });
    if (ifIdExists) purchaseId = "";
  }

  const products = await Product.findAll({
    where: {
      productId: {
        [Op.in]: req?.body?.products?.map((each) => each?.productId),
      },
    },
  });

  let price = [];
  let totalPrice = 0;
  let purchaseProducts = [];

  products?.map((each) =>
    req?.body?.products?.filter((i) => {
      if (i?.productId === each?.productId) {
        price?.push(each?.price * i?.quantity);
        purchaseProducts.push({
          userId: req?.body?.userId,
          productId: each?.productId,
          purchaseId,
          totalPrice: each?.price * i?.quantity,
          productPrice: each?.price,
          quantity: i?.quantity,
        });
      }
    })
  );
  totalPrice = price?.reduce((a, b) => a + b, 0);

  await ProductPurchase.bulkCreate(purchaseProducts);

  await TotalPurchase.create({
    purchaseId,
    userId: req?.body?.userId,
    price: totalPrice,
    actionBy: req?.user?.id,
  });

  return res.json({
    message: "Product Purchase Done!",
  });
});

module.exports = controller;
