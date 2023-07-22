const handler = require("express-async-handler");

const Product = require("../models/product.model");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Category = require("../models/category.model");
const Order = require("../models/order.model");

const helperUtils = require("../utils/helperUtils");
const authUtils = require("../utils/auth.utils");
const constantUtils = require("../utils/constant.utils");
const structureUtils = require("../utils/structure.utils");
const Discount = require("../models/discount.model");
const sequelize = require("../models");

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
    images : req?.body?.images,
    categoryType : req?.body?.categoryType,
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

controller.addDiscountCode = handler(async (req, res) => {
  if (!req?.body?.discountCode) throw "400|Discount_Code_Required!";
  if (!req?.body?.amount) throw "400|Amount_Required!";
  if (!req?.body?.startDate) throw "400|Start_Date_Required!";
  if (!req?.body?.endDate) throw "400|End_Date_Required!";

  const discountId = helperUtils.generateRandomNumber(8);
  const discount = await Discount.create({
    discountId: discountId,
    discountCode: req?.body?.discountCode,
    amount: req?.body?.amount,
    startDate: req?.body?.startDate,
    endDate: req?.body?.endDate,
    addedBy: req?.admin?.adminId,
  });

  if (!discount) throw "400|Somthing_Went_Wrong!";

  return res.json({
    message: "success!",
  });
});

controller.getAllDiscountCode = handler(async (req, res) => {
  const condition = {};

  if (req?.body?.status) condition["status"] = req?.body?.status;

  const discount = await Discount.findAll(condition);

  const discountData = discount?.map((each) =>
  structureUtils.discountStructure(each)
  );

  return res.json(discountData);
});

controller.getAllProducts = handler(async (req, res) => {
  const condition = {};

  if(req?.body?.status) condition["status"] = req?.body?.status

  if(req?.body?.categoryType) condition["categoryType"] = req?.body?.categoryType
  
  const products = await Product.findAll({
    where: condition,
    order: [["id", "ASC"]],
  });

  return res.json(
    products?.map((each) => structureUtils.panelProductStructure(each))
  );
});

controller.adminLogin = handler(async(req,res) => {
  if(!req?.body?.email) throw "400|Email_Required!"
  if(!req?.body?.password) throw "400|Password_Required!"

  const admin = await Admin.findOne({
    where : {
      email : req?.body?.email,
      password : req?.body?.password
    }
  })

  if(!admin) throw "400|Admin_Not_Found!"

  return res.json(admin)

})

controller.toggleProductStatus = handler(async(req,res) => {
  if(!req?.body?.productId) throw "400|ProductId_Required!"
  if(!req?.body?.status) throw "400|Status_Required!"
  const toogleStatus = await Product.findOne({
    where : {
      productId : req?.body?.productId
    }
  })
  if(!toogleStatus) throw "400|Product_Not_Found!"
  toogleStatus.status = req?.body?.status
  await toogleStatus.save()

return res.json({
  message : "success!"
})
})

controller.getAllCount = handler(async(req,res) => {
  const product = await Product.count({
    where : {
      status : constantUtils.ACTIVE
    }
  })
  const order = await Order.count({
    where : {
        status : constantUtils.ACTIVE
        }
      })
  return res.json({
    productCount : product,
    orderCount : order
  })
})

module.exports = controller;
