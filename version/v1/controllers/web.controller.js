const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");
const ProductPurchase = require("../models/cart.model");
const TotalPurchase = require("../models/total.purchase.model");

const helperUtils = require("../utils/helperUtils");
const authUtils = require("../utils/auth.utils");
const constantUtils = require("../utils/constant.utils");
const structureUtils = require("../utils/structure.utils");
const sequelize = require("../models");
const { Op } = require("sequelize");
const Feedback = require("../models/feedback.model");
const Cart = require("../models/cart.model");

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

controller.userFeedback = handler(async (req, res) => {
  const feedback = await Feedback.create({
    userName: req?.body?.userName,
    email: req?.body?.userName,
    phoneNumber: helperUtils.encrypt(req?.body?.phoneNumber),
    subject: req?.body?.subject,
    message: req?.body?.message,
  });
  if (!feedback) throw "400|Somthing_Weent_Wrong!";
  return res.json({
    message: "success",
  });
});

controller.getcartbyuser = handler(async (req, res) => {
  if (!req?.body?.userId) throw "400|User_Id_Requried!";
  const cart = await ProductPurchase.findAll({
    where: { userId: req?.body?.userId },
  });
  res.json({ cart });
});

// controller.addtocart = handler(async (req, res) => {
//   if (!req.user?.userId) throw "400 user_id Required";
//   if (req.body.length === 0) throw "400 product required";

//   const products = await Product.findAll({
//     where: {
//       productId: {
//         [Op.in]: req?.body?.map((each) => each?.productId),
//       },
//     },
//   });
//   let purchaseId = parseInt(helperUtils.generateRandomNumber(8));
//   let cartrows = [];
//   for (let i = 0; i < req.body.length; i++) {
//     for (let j = 0; j < products.length; j++) {
//       if (Number(req.body[i].productId) === products[j].productId) {
//         cartrows.push({
//           userId: req.user?.userId,
//           purchaseId: purchaseId,
//           productId: products[j].productId,
//           quantity: req.body[i].quantity,
//           totalPrice: products[j].price * req.body[i].quantity,
//           productPrice: products[j].price,
//           status: "active",
//         });
//         break;
//       }
//     }
//   }
//   await Cart.bulkCreate(cartrows);
//   res.json({ message: "cart addeded susscefully" });
// });

controller.addtocart = handler(async (req, res) => {
  if (req?.body?.length === 0) throw "400|Product_Required";

  const products = await Product.findAll({
    where: {
      productId: {
        [Op.in]: req?.body?.map((each) => each?.productId),
      },
    },
  });

  const purchaseId = parseInt(helperUtils.generateRandomNumber(8));
  const cartrows = [];

  for (let i = 0; i < req.body.length; i++) {
    const existingCartEntry = await Cart.findOne({
      where: {
        userId: req.user?.userId,
        productId: req?.body[i]?.productId,
      },
    });

    if (existingCartEntry) {
      // Update the existing cart entry instead of creating a new one
      const updatedQuantity = req?.body[i]?.quantity;
      await existingCartEntry.update({
        quantity: updatedQuantity,
        totalPrice: products[i]?.price * updatedQuantity,
      });
    } else {
      const product = products.find(
        (p) => p?.productId === req?.body[i]?.productId
      );

      if (product) {
        cartrows.push({
          userId: req?.user?.userId,
          purchaseId: purchaseId,
          productId: product?.productId,
          quantity: req?.body[i]?.quantity,
          totalPrice: product?.price * req?.body[i]?.quantity,
          productPrice: product.price,
          status: constantUtils.ACTIVE,
        });
      }
    }
  }

  if (cartrows.length > 0) {
    await Cart.bulkCreate(cartrows);
  }

  let cartitems = await Cart.findAll({
    where: { userId: req.user?.userId, status: constantUtils.ACTIVE },
    include: [
      {
        model: Product,
      },
    ],
  });

  return res.status(200).json({ message: "Sucess", cartitems: cartitems });
});

controller.updateCart = handler(async (req, res) => {
  if (!req.body) throw "400|Data_Required";

  const product = await Product.findOne({
    where: { productId: req?.body?.productId },
  });
  if (!product) throw "404|Product_Not_Found!";
  const cart = await Cart.findOne({
    where: { id: req?.body?.cartid },
  });
  if (!cart) throw "404|No_Cart_Found!";
  cart.totalPrice = product?.price * req?.body?.quantity;
  await cart.save();
  return res.json(cart);
});
module.exports = controller;

// Cartcontroller.addToCart = async (req, res) => {
//   const userid = req.User.userid;
//   const productId = req.body.productId;
//   const quantity = req.body.quantity || 1;

//   try {
//     const existingCartRow = await Model.cart.findOne({
//       where: {
//         userid: userid,
//         productId: productId,
//       },
//     });

//     if (existingCartRow) {
//       const newCartRow = await existingCartRow.increment("quantity", {
//         by: quantity,
//       });
//       newCartRow.quantity += Number(quantity);
//       res.send(newCartRow);
//     } else {
//       const newCartRow = await Model.cart.create({
//         userid: userid,
//         productId: productId,
//         quantity: quantity,
//       });
//       res.send(newCartRow);
//     }
//   } catch (error) {
//     logger.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
