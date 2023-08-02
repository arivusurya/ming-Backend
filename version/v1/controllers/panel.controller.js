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
const OrderItem = require("../models/orderItem.model");
const { date } = require("joi");
const { Sequelize } = require("sequelize");
const Cart = require("../models/cart.model");

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
  try {
    const productData = req.body;
    console.log(req?.body);
    const productId = parseInt(helperUtils?.generateRandomNumber(8));

    // // Check if the category exists in the database
    const category = await Category.findOne({
      where: { name: productData?.type },
    });
    if (!category) {
      // Handle the case when the category does not exist
      return res.status(400).json({ error: "Category not found." });
    }

    // // If the category exists, create the product
    const product = await Product.create({
      productId: productId,
      categoryId: category?.categoryId,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      categoryType: category?.name,
      weight: productData.weight,
      image: productData?.mainImage,
      images: productData?.additionalImages || [],
    });

    if (!product) {
      // Handle the case when the product creation fails
      return res
        .status(400)
        .json({ error: "Something went wrong while creating the product." });
    }

    return res.json({ message: "Product created successfully!" });
  } catch (error) {
    console.log(error);
    // Handle other potential errors, such as validation errors or database issues
    return res.status(400).json({ error: "Something went wrong!" });
  }
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

  if (req?.body?.status) condition["status"] = req?.body?.status;

  if (req?.body?.categoryType)
    condition["categoryType"] = req?.body?.categoryType;

  const products = await Product.findAll({
    where: condition,
    order: [["id", "ASC"]],
  });

  return res.json(
    products?.map((each) => structureUtils.panelProductStructure(each))
  );
});

controller.adminLogin = handler(async (req, res) => {
  if (!req?.body?.email) throw "400|Email_Required!";
  if (!req?.body?.password) throw "400|Password_Required!";

  const admin = await Admin.findOne({
    where: {
      email: req?.body?.email,
      password: req?.body?.password,
    },
  });

  if (!admin) throw "400|Admin_Not_Found!";

  return res.json(admin);
});

controller.toggleProductStatus = handler(async (req, res) => {
  if (!req?.body?.productId) throw "400|ProductId_Required!";
  if (!req?.body?.status) throw "400|Status_Required!";
  const toogleStatus = await Product.findOne({
    where: {
      productId: req?.body?.productId,
    },
  });
  if (!toogleStatus) throw "400|Product_Not_Found!";
  toogleStatus.status = req?.body?.status;
  await toogleStatus.save();

  return res.json({
    message: "success!",
  });
});

controller.getAllCount = handler(async (req, res) => {
  const product = await Product.count({
    where: {
      status: constantUtils.ACTIVE,
    },
  });

  const order = await Order.count({
    where: {
      status: constantUtils.ACTIVEORDERS,
    },
  });

  const user = await User.count({
    where: {
      status: constantUtils.ACTIVE,
    },
  });

  const transection = await Order.count({
    where: {
      status: constantUtils.ACTIVE,
      hasPaid: constantUtils.PAID,
    },
  });
  return res.json({
    productCount: product,
    orderCount: order,
    CustomerCount: user,
    transection: transection,
  });
});
controller.getOders = handler(async (req, res) => {
  const { status, page } = req?.query;
  const ItemperPage = 15;
  const PageNum = parseInt(page, 10) || 1;

  const order = await Order.findAndCountAll({
    where: {
      status: status,
    },
    include: [
      {
        model: User,
      },
      {
        model: OrderItem,
        include: Product,
      },
      {
        model: Address,
      },
    ],
    offset: (PageNum - 1) * ItemperPage,
    limit: ItemperPage,
  });
  const totalpage = Math.ceil(order.count / ItemperPage);

  return res.json({
    orders: structureUtils.AdminActiveOrder(order.rows),
    totalpage: totalpage,
  });
});

controller.TopsellingProducts = handler(async (req, res) => {
  try {
    const topproducts = await OrderItem.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalUnits"],
        [Sequelize.col("image"), "imageUrl"],
        [Sequelize.col("name"), "Productname"],
        // Include the 'imageUrl' attribute from the 'products' table
      ],
      include: [
        {
          model: Product,
          attributes: [], // Include only the 'name' attribute from the 'products' table
        },
      ],
      group: ["productId", "name", "image"], // Group by productId, Product.name, and Product.imageUrl
      order: [[Sequelize.literal("totalUnits"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({ product: topproducts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
});

controller.getuser = handler(async (req, res) => {
  const { page = 1, status } = req.query;
  const limit = 15; // Number of records per page
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (status) {
    whereClause.status = status;
  }

  const users = await User.findAll({
    where: whereClause,
    limit,
    offset,
  });

  const totalUsers = await User.count({ where: whereClause });

  res.status(200).json({
    users: structureUtils.AdminUser(users),
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
  });
});

controller.DeleteAccount = handler(async (req, res) => {
  console.log(req?.params?.id);
  const user = await User.findOne({
    where: { userId: req?.params?.id },
    include: [
      {
        model: Address,
      },
      {
        model: Order,
        include: OrderItem,
      },
      {
        model: Cart,
      },
    ],
  });
  console.log(user);
  await user.destroy();
  res.status(200).json({ message: "User Data cleared" });
});

module.exports = controller;
